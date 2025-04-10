import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { fromB64 } from '@mysten/sui.js/utils';

// Initialize connection to Sui testnet
const client = new SuiClient({
  url: 'https://fullnode.testnet.sui.io:443'
});

export { client, TransactionBlock, Ed25519Keypair, fromB64 };

// Function to connect wallet
export async function connectWallet() {
    try {
        // Check if Sui wallet is installed
        if (!window.suiWallet) {
            throw new Error('Please install Sui Wallet');
        }

        // Request wallet connection
        const response = await window.suiWallet.requestPermissions();
        return response;
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
}

// Function to mint NFT
export async function mintNFT(name: string, description: string, imageUrl: string) {
    try {
        const tx = new TransactionBlock();
        
        // Add mint_nft function call
        tx.moveCall({
            target: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::nft_store::mint_nft`,
            arguments: [
                tx.pure(name),
                tx.pure(description),
                tx.pure(imageUrl),
            ],
        });

        // Execute transaction
        const result = await window.suiWallet.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        return result;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
}

// Function to list NFT for sale
export async function listNFTForSale(nftId: string, price: number) {
    try {
        const tx = new TransactionBlock();
        
        // Add list_nft_for_sale function call
        tx.moveCall({
            target: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::nft_store::list_nft_for_sale`,
            arguments: [
                tx.object(nftId),
                tx.pure(price),
            ],
        });

        // Execute transaction
        const result = await window.suiWallet.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        return result;
    } catch (error) {
        console.error('Error listing NFT:', error);
        throw error;
    }
}

// Function to purchase NFT
export async function purchaseNFT(nftId: string, price: number) {
    try {
        const tx = new TransactionBlock();
        
        // Split coins for payment
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(price)]);
        
        // Add purchase_nft function call
        tx.moveCall({
            target: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::nft_store::purchase_nft`,
            arguments: [
                tx.object(nftId),
                coin,
            ],
        });

        // Execute transaction
        const result = await window.suiWallet.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        return result;
    } catch (error) {
        console.error('Error purchasing NFT:', error);
        throw error;
    }
}

// Function to get NFT details
export async function getNFTDetails(nftId: string) {
    try {
        const nft = await client.getObject({
            id: nftId,
            options: { showContent: true },
        });

        return nft;
    } catch (error) {
        console.error('Error getting NFT details:', error);
        throw error;
    }
}

// Add TypeScript declarations for window.suiWallet
declare global {
    interface Window {
        suiWallet: {
            requestPermissions: () => Promise<any>;
            signAndExecuteTransactionBlock: (params: { transactionBlock: TransactionBlock }) => Promise<any>;
        };
    }
} 