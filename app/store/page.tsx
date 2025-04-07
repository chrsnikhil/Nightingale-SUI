"use client";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NFT_STORE_CONFIG } from '@/config/nft-store';
import { SuiClient } from '@mysten/sui.js/client';
import Link from "next/link";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

interface NFT {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

const NFT_TEMPLATES = [
  {
    id: "1",
    name: "Cosmic Explorer",
    price: "0.5",
    image: "https://picsum.photos/400/400?random=1",
    description: "A journey through the cosmos"
  },
  {
    id: "2",
    name: "Digital Dreamer",
    price: "0.3",
    image: "https://picsum.photos/400/400?random=2",
    description: "Where reality meets imagination"
  },
  {
    id: "3",
    name: "Neon Warrior",
    price: "0.7",
    image: "https://picsum.photos/400/400?random=3",
    description: "Fight in the digital realm"
  },
  {
    id: "4",
    name: "Cyber Samurai",
    price: "0.8",
    image: "https://picsum.photos/400/400?random=4",
    description: "Ancient warrior in digital age"
  },
  {
    id: "5",
    name: "Quantum Explorer",
    price: "0.6",
    image: "https://picsum.photos/400/400?random=5",
    description: "Journey through quantum realms"
  },
  {
    id: "6",
    name: "Digital Phoenix",
    price: "0.9",
    image: "https://picsum.photos/400/400?random=6",
    description: "Rise from digital ashes"
  },
  {
    id: "7",
    name: "Neon Nomad",
    price: "0.4",
    image: "https://picsum.photos/400/400?random=7",
    description: "Wanderer of digital cities"
  },
  {
    id: "8",
    name: "Cyber Guardian",
    price: "0.7",
    image: "https://picsum.photos/400/400?random=8",
    description: "Protector of digital realms"
  }
];

// Add global styles for wallet modal
const globalStyles = `
  .wallet-kit-connect-modal {
    z-index: 9999 !important;
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 400px !important;
    max-width: 90vw !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
    background: #000 !important;
    border: 1px solid #333 !important;
    border-radius: 12px !important;
    padding: 24px !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  }
  
  .wallet-kit-connect-modal-overlay {
    z-index: 9998 !important;
    background: rgba(0, 0, 0, 0.8) !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
  }

  .wallet-kit-connect-modal-content {
    background: #000 !important;
    color: #fff !important;
    padding: 20px !important;
  }

  .wallet-kit-connect-modal-header {
    color: #fff !important;
    font-size: 1.5rem !important;
    font-weight: bold !important;
    margin-bottom: 20px !important;
  }

  .wallet-kit-connect-modal-close {
    color: #fff !important;
    position: absolute !important;
    top: 20px !important;
    right: 20px !important;
    cursor: pointer !important;
  }

  .wallet-kit-connect-modal-body {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }

  .wallet-kit-connect-modal-button {
    background: #fff !important;
    color: #000 !important;
    padding: 12px 24px !important;
    border-radius: 8px !important;
    border: none !important;
    cursor: pointer !important;
    font-weight: bold !important;
    transition: background-color 0.2s !important;
  }

  .wallet-kit-connect-modal-button:hover {
    background: #e5e5e5 !important;
  }
`;

function StoreContent() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [showMintDialog, setShowMintDialog] = useState(false);
  const [mintingStatus, setMintingStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [mintCapId, setMintCapId] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showCustomNotification = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ title, message, type });
    setShowNotification(true);
  };

  // Fetch MintCap object when account changes
  useEffect(() => {
    const fetchMintCap = async () => {
      if (!account) return;
      
      try {
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        const objects = await client.getOwnedObjects({
          owner: account.address,
          filter: {
            StructType: `${NFT_STORE_CONFIG.PACKAGE_ID}::nft::MintCap`
          },
          options: {
            showType: true,
            showContent: true,
            showOwner: true,
            showPreviousTransaction: true,
            showDisplay: true,
            showBcs: true,
            showStorageRebate: true,
          }
        });

        if (objects.data.length > 0 && objects.data[0].data?.objectId) {
          setMintCapId(objects.data[0].data.objectId);
        } else {
          console.error('No MintCap found in wallet');
          showCustomNotification(
            'MintCap Not Found',
            'No MintCap found in your wallet. Please contact the contract owner.',
            'error'
          );
        }
      } catch (error) {
        console.error('Error fetching MintCap:', error);
        showCustomNotification(
          'Error',
          'Failed to fetch MintCap. Please try again.',
          'error'
        );
      }
    };

    fetchMintCap();
  }, [account]);

  const handleMintNFT = async (nft: NFT) => {
    try {
      if (!account) {
        showCustomNotification(
          'Wallet Not Connected',
          'Please connect your wallet first',
          'info'
        );
        return;
      }

      if (!mintCapId) {
        showCustomNotification(
          'MintCap Not Found',
          'No MintCap found in your wallet. Please contact the contract owner.',
          'error'
        );
        return;
      }

      setMintingStatus('minting');

      // Create transaction block
      const tx = new TransactionBlock();
      
      // Add mint_nft function call
      tx.moveCall({
        target: `${NFT_STORE_CONFIG.PACKAGE_ID}::nft::mint`,
        arguments: [
          tx.object(mintCapId),
          tx.pure(Array.from(new TextEncoder().encode(nft.name))),
          tx.pure(Array.from(new TextEncoder().encode(nft.description))),
          tx.pure(Array.from(new TextEncoder().encode(nft.image))),
        ],
        typeArguments: [],
      });

      // Execute transaction
      signAndExecute({
        transaction: tx.serialize(),
      }, {
        onSuccess: (result: any) => {
          console.log('NFT minted:', result);
          setMintingStatus('success');
          setShowMintDialog(false);
          showCustomNotification(
            'Success!',
            'NFT minted successfully!',
            'success'
          );
        },
        onError: (error: Error) => {
          console.error('Failed to mint NFT:', error);
          setMintingStatus('error');
          showCustomNotification(
            'Minting Failed',
            `Failed to mint NFT: ${error.message}`,
            'error'
          );
        }
      });
    } catch (error: any) {
      console.error('Failed to mint NFT:', error);
      setMintingStatus('error');
      showCustomNotification(
        'Error',
        `Failed to mint NFT: ${error.message || 'Unknown error'}`,
        'error'
      );
    } finally {
      setMintingStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-light tracking-wide text-white">NFT Store</h1>
              <div className="flex items-center gap-4">
                <ConnectButton connectText="Connect Wallet" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {NFT_TEMPLATES.map((nft) => (
              <CardContainer 
                key={nft.id} 
                className="w-full h-full"
                containerClassName="w-full h-full"
              >
                <CardBody className="bg-black/50 backdrop-blur-sm relative group/card hover:shadow-2xl hover:shadow-gray-500/[0.1] border-gray-800 w-full h-full rounded-xl p-6 border transition-all duration-300">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-light text-white"
                  >
                    <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl bg-gray-900/50">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ="60"
                    className="text-xl font-light mb-3 text-white tracking-wide"
                  >
                    {nft.name}
                  </CardItem>
                  <CardItem
                    translateZ="40"
                    className="text-gray-400 mb-4 text-sm font-light"
                  >
                    {nft.description}
                  </CardItem>
                  <div className="flex justify-between items-center mt-6">
                    <CardItem
                      translateZ={20}
                      translateX={-5}
                      as="span"
                      className="text-lg font-light text-white"
                    >
                      {nft.price} SUI
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      translateX={5}
                      as="button"
                      onClick={() => {
                        if (!account) {
                          showCustomNotification(
                            'Wallet Not Connected',
                            'Please connect your wallet first',
                            'info'
                          );
                          return;
                        }
                        setSelectedNFT(nft);
                        setShowMintDialog(true);
                      }}
                      className="px-6 py-2 rounded-xl bg-white/10 text-white text-sm font-light hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      {account ? "Mint Now" : "Connect to Mint"}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Dialog */}
      <Dialog open={showNotification} onOpenChange={setShowNotification}>
        <DialogContent className="bg-black/90 backdrop-blur-sm text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className={`text-xl font-light tracking-wide ${
              notification?.type === 'success' ? 'text-green-400' : 
              notification?.type === 'error' ? 'text-red-400' : 
              'text-blue-400'
            }`}>
              {notification?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400 font-light">
              {notification?.message}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-end gap-4">
            {notification?.type === 'success' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-white/10 text-white font-light text-lg hover:bg-white/20 transition-all duration-300"
                onClick={() => {
                  setShowNotification(false);
                  setShowMintDialog(false);
                }}
              >
                View NFT
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white/10 text-white font-light text-lg hover:bg-white/20 transition-all duration-300"
              onClick={() => setShowNotification(false)}
            >
              Close
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mint Dialog */}
      <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
        <DialogContent className="bg-black text-white border-gray-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Mint NFT</DialogTitle>
            <DialogDescription className="text-gray-400">
              Confirm the details below to mint your NFT
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            {/* NFT Preview */}
            <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gray-900">
              <img
                src={selectedNFT?.image}
                alt={selectedNFT?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NFT Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Name</span>
                <span className="font-medium text-right max-w-[60%] break-words">{selectedNFT?.name}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Description</span>
                <span className="font-medium text-right max-w-[60%] break-words">{selectedNFT?.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price</span>
                <span className="font-medium text-blue-400">{selectedNFT?.price} SUI</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Wallet Address</span>
                <span className="font-mono text-sm text-gray-300 text-right max-w-[60%] break-all">{account?.address}</span>
              </div>
            </div>

            {/* Status Messages */}
            {mintingStatus === 'minting' && (
              <div className="flex items-center gap-2 text-yellow-400">
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <span>Minting in progress...</span>
              </div>
            )}
            {mintingStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-400">
                <span>Minting failed. Please try again.</span>
              </div>
            )}
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="sticky bottom-0 bg-black pt-4 mt-6 border-t border-gray-800">
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 text-white px-8 py-4 rounded-xl font-light text-lg hover:bg-white/20 transition-all duration-300"
                onClick={() => setShowMintDialog(false)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-200 transition-colors"
                style={{ fontFamily: 'Minecraft' }}
                onClick={() => selectedNFT && handleMintNFT(selectedNFT)}
              >
                {mintingStatus === 'minting' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Minting...</span>
                  </div>
                ) : (
                  'Confirm Mint'
                )}
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function StorePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <div className="min-h-screen bg-black">
            <StoreContent />
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
} 