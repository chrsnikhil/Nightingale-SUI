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
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">NFT Store</h1>
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
              <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-gray-500/[0.1] border-gray-800 w-full h-full rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-white"
                >
                  <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl bg-gray-900">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover rounded-xl group-hover/card:shadow-xl"
                      loading="lazy"
                    />
                  </div>
                </CardItem>
                <CardItem
                  as="h3"
                  translateZ="60"
                  className="text-xl font-bold mb-3 text-white"
                >
                  {nft.name}
                </CardItem>
                <CardItem
                  translateZ="40"
                  className="text-gray-400 mb-4"
                >
                  {nft.description}
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <CardItem
                    translateZ={20}
                    translateX={-5}
                    as="span"
                    className="text-lg font-bold text-white"
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
                    className="px-6 py-2 rounded-xl bg-white text-black text-sm font-bold hover:scale-105 transition-transform hover:bg-gray-200"
                  >
                    {account ? "Mint Now" : "Connect to Mint"}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Notification Dialog */}
      <Dialog open={showNotification} onOpenChange={setShowNotification}>
        <DialogContent className="bg-black text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className={notification?.type === 'success' ? 'text-green-500' : 
                               notification?.type === 'error' ? 'text-red-500' : 
                               'text-blue-500'}>
              {notification?.title}
            </DialogTitle>
            <DialogDescription>
              {notification?.message}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setShowNotification(false)}
              className="bg-white text-black hover:bg-gray-200"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mint Dialog */}
      <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
        <DialogContent className="bg-black text-white border-gray-800">
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
                <span className="font-medium">{selectedNFT?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Description</span>
                <span className="font-medium text-right max-w-[60%]">{selectedNFT?.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price</span>
                <span className="font-medium text-blue-400">{selectedNFT?.price} SUI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Wallet Address</span>
                <span className="font-mono text-sm text-gray-300">{account?.address}</span>
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

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setShowMintDialog(false)}
              className="border-gray-800 text-white hover:bg-gray-800 px-6"
              disabled={mintingStatus === 'minting'}
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedNFT && handleMintNFT(selectedNFT)}
              className="bg-white text-black hover:bg-gray-200 px-6"
              disabled={mintingStatus === 'minting'}
            >
              {mintingStatus === 'minting' ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Minting...</span>
                </div>
              ) : (
                'Confirm Mint'
              )}
            </Button>
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