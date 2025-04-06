"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useCurrentAccount, useSignAndExecuteTransaction, ConnectButton, useCurrentWallet, useAccounts, useSuiClient } from "@mysten/dapp-kit";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { useWallet } from '@suiet/wallet-kit';
import { Input } from '@/components/ui/input';
import { bcs } from '@mysten/sui/bcs';
import { toast } from "react-hot-toast";

type WagerStatus = 'idle' | 'waiting' | 'active' | 'completed' | 'error';

const WAGER_PACKAGE_ID = '0x20ad981130ccd80717f6c780f220b5d7c6c79b9a59c7be96f04f263811bb481c';

export default function GamePage() {
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const account = useCurrentAccount();
  const accounts = useAccounts();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const [isWagerDialogOpen, setIsWagerDialogOpen] = useState(false);
  const [wagerAmount, setWagerAmount] = useState('');
  const [wagerStatus, setWagerStatus] = useState<WagerStatus>('idle');
  const [wagerId, setWagerId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [joinWagerId, setJoinWagerId] = useState('');
  const [creatorAddress, setCreatorAddress] = useState<string | null>(null);

  const handleWagerAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWagerAmount(e.target.value);
  };

  const handleCreateWager = async () => {
    try {
      if (!account) {
        throw new Error('No account connected');
      }

      if (!wagerAmount || parseFloat(wagerAmount) <= 0) {
        throw new Error('Please enter a valid wager amount');
      }

      setWagerStatus('waiting');
      setErrorMessage(null);

      // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
      const wagerAmountInMist = BigInt(Math.floor(parseFloat(wagerAmount) * 1_000_000_000));

      const tx = new TransactionBlock();
      tx.setGasBudget(100000000);

      // Split the coin for the wager amount
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(wagerAmountInMist)]);

      tx.moveCall({
        target: `${WAGER_PACKAGE_ID}::wager::create_wager`,
        arguments: [
          coin,
        ],
      });

      signAndExecute({
        transaction: tx.serialize(),
      }, {
        onSuccess: async (response) => {
          try {
            const txResponse = await suiClient.waitForTransaction({
              digest: response.digest,
              options: {
                showEffects: true,
                showEvents: true,
                showBalanceChanges: true,
              },
            });

            if (txResponse.effects?.status.status === 'success') {
              // Find the shared object in the created objects
              const sharedObject = txResponse.effects.created?.find(
                item => 'Shared' in item.owner
              );

              if (sharedObject) {
                setWagerId(sharedObject.reference.objectId);
                setWagerStatus('waiting');
                
                // Show detailed transaction information
                const gasUsed = txResponse.effects.gasUsed || { computationCost: 0, storageCost: 0, storageRebate: 0 };
                const totalGas = (BigInt(gasUsed.computationCost) + BigInt(gasUsed.storageCost) - BigInt(gasUsed.storageRebate)) / BigInt(1_000_000_000);
                
                toast.success(
                  `Wager created successfully!\n` +
                  `Amount: ${wagerAmount} SUI\n` +
                  `Gas used: ${totalGas.toString()} SUI\n` +
                  `Transaction ID: ${response.digest}`
                );
              } else {
                throw new Error('Failed to get wager ID from created objects');
              }
            } else {
              throw new Error(`Transaction failed: ${txResponse.effects?.status.error || 'Unknown error'}`);
            }
          } catch (error) {
            console.error('Error handling transaction response:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
            setWagerStatus('error');
          }
        },
        onError: (error) => {
          console.error('Error creating wager:', error);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to create wager');
          setWagerStatus('error');
        },
      });
    } catch (error) {
      console.error('Error creating wager:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create wager');
      setWagerStatus('error');
    }
  };

  const handleJoinWager = async () => {
    try {
      if (!account) {
        throw new Error('Please connect a wallet to join the wager');
      }

      if (!wagerId) {
        throw new Error('No wager ID found');
      }

      setWagerStatus('waiting');
      setErrorMessage(null);

      const tx = new TransactionBlock();
      tx.setGasBudget(100000000);

      // Get the wager object to get the amount
      const wagerObject = await suiClient.getObject({
        id: wagerId,
        options: {
          showContent: true,
        }
      });

      if (!wagerObject.data?.content) {
        throw new Error('Failed to get wager details');
      }

      const wagerAmountInMist = BigInt(wagerObject.data.content.fields.amount);

      // Split the coin for the wager amount
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(wagerAmountInMist)]);

      tx.moveCall({
        target: `${WAGER_PACKAGE_ID}::wager::join_wager`,
        arguments: [
          tx.object(wagerId),
          coin,
        ],
      });

      signAndExecute({
        transaction: tx.serialize(),
      }, {
        onSuccess: async (response) => {
          try {
            const txResponse = await suiClient.waitForTransaction({
              digest: response.digest,
              options: {
                showEffects: true,
                showEvents: true,
                showBalanceChanges: true,
              },
            });

            if (txResponse.effects?.status.status === 'success') {
              setWagerStatus('active');
              setIsWagerDialogOpen(false);
              
              // Show detailed transaction information
              const gasUsed = txResponse.effects.gasUsed || { computationCost: 0, storageCost: 0, storageRebate: 0 };
              const totalGas = (BigInt(gasUsed.computationCost) + BigInt(gasUsed.storageCost) - BigInt(gasUsed.storageRebate)) / BigInt(1_000_000_000);
              
              toast.success(
                `Successfully joined the wager!\n` +
                `Gas used: ${totalGas.toString()} SUI\n` +
                `Transaction ID: ${response.digest}`
              );
            } else {
              throw new Error(`Transaction failed: ${txResponse.effects?.status.error || 'Unknown error'}`);
            }
          } catch (error) {
            console.error('Error handling transaction response:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
            setWagerStatus('error');
          }
        },
        onError: (error) => {
          console.error('Error joining wager:', error);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to join wager');
          setWagerStatus('error');
        },
      });
    } catch (error) {
      console.error('Error joining wager:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to join wager');
      setWagerStatus('error');
    }
  };

  const handleSetWinner = async (winner: 'player1' | 'player2') => {
    try {
      if (!account) {
        throw new Error('No account connected');
      }

      if (!wagerId) {
        throw new Error('No wager ID found');
      }

      setWagerStatus('waiting');
      setErrorMessage(null);

      const tx = new TransactionBlock();
      tx.setGasBudget(100000000);

      // Get the wager object first to verify it exists
      const wagerObject = await suiClient.getObject({
        id: wagerId,
        options: {
          showContent: true,
          showOwner: true,
        }
      });

      if (!wagerObject.data) {
        throw new Error('Wager object not found');
      }

      console.log('Wager object:', wagerObject);

      // Get the winner's address based on the selection
      const winnerAddress = winner === 'player1' ? wagerObject.data.content.fields.player1 : wagerObject.data.content.fields.player2;

      tx.moveCall({
        target: `${WAGER_PACKAGE_ID}::wager::set_winner`,
        arguments: [
          tx.object(wagerId),
          tx.pure(winnerAddress),
        ],
      });

      signAndExecute({
        transaction: tx.serialize(),
      }, {
        onSuccess: async (response) => {
          try {
            const txResponse = await suiClient.waitForTransaction({
              digest: response.digest,
              options: {
                showEffects: true,
                showEvents: true,
              },
            });

            if (txResponse.effects?.status.status === 'success') {
              setWagerStatus('completed');
              toast.success(`Winner set successfully! ${winner === 'player1' ? 'Player 1' : 'Player 2'} has won the wager.`);
            } else {
              throw new Error('Transaction failed');
            }
          } catch (error) {
            console.error('Error handling transaction response:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
            setWagerStatus('error');
          }
        },
        onError: (error) => {
          console.error('Error setting winner:', error);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to set winner');
          setWagerStatus('error');
        },
      });
    } catch (error) {
      console.error('Error setting winner:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to set winner');
      setWagerStatus('error');
    }
  };

  const handleClaimWinnings = async () => {
    try {
      if (!account) {
        throw new Error('No account connected');
      }

      if (!wagerId) {
        throw new Error('No wager ID found');
      }

      setWagerStatus('waiting');
      setErrorMessage(null);

      const tx = new TransactionBlock();
      tx.setGasBudget(100000000);

      tx.moveCall({
        target: `${WAGER_PACKAGE_ID}::wager::claim_winnings`,
        arguments: [
          tx.object(wagerId),
        ],
      });

      signAndExecute({
        transaction: tx.serialize(),
      }, {
        onSuccess: async (response) => {
          try {
            const txResponse = await suiClient.waitForTransaction({
              digest: response.digest,
              options: {
                showEffects: true,
                showEvents: true,
                showBalanceChanges: true,
              },
            });

            if (txResponse.effects?.status.status === 'success') {
              setWagerStatus('idle');
              setWagerId(null);
              
              // Show detailed transaction information
              const gasUsed = txResponse.effects.gasUsed || { computationCost: 0, storageCost: 0, storageRebate: 0 };
              const totalGas = (BigInt(gasUsed.computationCost) + BigInt(gasUsed.storageCost) - BigInt(gasUsed.storageRebate)) / BigInt(1_000_000_000);
              
              toast.success(
                `Winnings claimed successfully!\n` +
                `Gas used: ${totalGas.toString()} SUI\n` +
                `Transaction ID: ${response.digest}`
              );
              
              setIsWagerDialogOpen(false);
            } else {
              throw new Error('Transaction failed');
            }
          } catch (error) {
            console.error('Error handling transaction response:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
            setWagerStatus('error');
          }
        },
        onError: (error) => {
          console.error('Error claiming winnings:', error);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to claim winnings');
          setWagerStatus('error');
        },
      });
    } catch (error) {
      console.error('Error claiming winnings:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to claim winnings');
      setWagerStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">NFT Game</h1>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-800">
                  Back to Home
                </Button>
              </Link>
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Welcome to the Game!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Create a wager and challenge your friend to a game!
          </p>

          {/* Game Area */}
          <div className="relative w-full aspect-square max-w-2xl mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="text-6xl">🎮</div>
            </motion.div>
          </div>

          {/* Game Controls */}
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
              onClick={() => setIsWagerDialogOpen(true)}
              disabled={!account}
            >
              {wagerId ? 'View Wager' : 'Create Wager'}
            </Button>
          </div>

          {/* Game Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">High Score</h3>
              <p className="text-4xl text-blue-400">0</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">NFTs Collected</h3>
              <p className="text-4xl text-green-400">0</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Rewards Earned</h3>
              <p className="text-4xl text-yellow-400">0 SUI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wager Dialog */}
      <Dialog open={isWagerDialogOpen} onOpenChange={setIsWagerDialogOpen}>
        <DialogContent className="bg-black text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {wagerId ? 'Wager Details' : 'Create Wager'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {wagerId ? 'View and manage your wager' : 'Set up a wager for your next game'}
            </DialogDescription>
          </DialogHeader>
          
          {!wagerId ? (
            // Create Wager Form
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your Wallet</span>
                  <ConnectButton />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Amount (SUI)</span>
                  <Input
                    type="number"
                    value={wagerAmount}
                    onChange={handleWagerAmountChange}
                    placeholder="Enter amount (e.g., 1.0)"
                    className="w-32 text-right bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              {wagerStatus === 'waiting' && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-orange-400 font-medium">Creating your wager...</span>
                </div>
              )}
            </div>
          ) : (
            // Wager Details View
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Wager ID</span>
                  <code className="font-mono text-sm bg-gray-900 p-3 rounded break-all text-green-400">
                    {wagerId}
                  </code>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-mono text-lg text-green-400">{wagerAmount} SUI</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-medium ${
                    wagerStatus === 'waiting' ? 'text-orange-400' :
                    wagerStatus === 'active' ? 'text-blue-400' :
                    wagerStatus === 'completed' ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {wagerStatus.charAt(0).toUpperCase() + wagerStatus.slice(1)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-800 my-4" />
              
              {wagerStatus === 'waiting' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Waiting for opponent to join...</p>
                    <div className="flex flex-col gap-4">
                      <Button
                        onClick={handleJoinWager}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!account}
                      >
                        Join Wager
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {wagerStatus === 'active' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Select the winner:</p>
                    <div className="flex flex-col gap-4">
                      <Button
                        onClick={() => handleSetWinner('player1')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Player 1 Wins
                      </Button>
                      <Button
                        onClick={() => handleSetWinner('player2')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Player 2 Wins
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {wagerStatus === 'completed' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-green-400 mb-4">Wager completed! Winner has been set.</p>
                    <div className="flex flex-col gap-4">
                      <Button
                        onClick={handleClaimWinnings}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Claim Winnings
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-md">
              <p className="font-mono text-sm">{errorMessage}</p>
            </div>
          )}

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsWagerDialogOpen(false);
                if (!wagerId) {
                  setWagerStatus('idle');
                }
              }}
              className="border-gray-800 text-white hover:bg-gray-800 px-6"
            >
              {wagerId ? 'Close' : 'Cancel'}
            </Button>
            {!wagerId && (
              <Button
                onClick={handleCreateWager}
                className="bg-white text-black hover:bg-gray-200 px-6"
                disabled={wagerStatus === 'waiting'}
              >
                {wagerStatus === 'waiting' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create Wager'
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-md max-w-md mx-auto">
          <p className="font-mono text-sm">{errorMessage}</p>
        </div>
      )}

      {wagerId && (
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Active Wager</h2>
          <p className="font-mono text-sm mb-2">Wager ID: {wagerId}</p>
          <p className="text-gray-400">
            {wagerStatus === 'active' ? 'Game in progress...' : 'Waiting for opponent...'}
          </p>
        </div>
      )}
    </div>
  );
} 