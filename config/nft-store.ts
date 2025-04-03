export const NFT_STORE_CONFIG = {
  // Smart Contract Configuration
  PACKAGE_ID: process.env.NEXT_PUBLIC_PACKAGE_ID || '',
  MODULE_NAME: 'nft',
  NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'testnet',
  COLLECTION_NAME: 'My NFT Collection',
  COLLECTION_DESCRIPTION: 'A collection of unique digital art pieces',
  
  // NFT Configuration
  METADATA_FIELDS: {
    name: 'string',
    description: 'string',
    image: 'string',
    attributes: 'array'
  },
  
  // Store Configuration
  FEATURES: {
    marketplace: true,
    allowListing: true,
    showOwnerAddress: true,
    showBalance: true
  },
  
  // UI Configuration
  THEME: {
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    accentColor: '#3b82f6'
  },
  
  // Network Configuration
  NETWORK_CONFIG: {
    testnet: {
      url: 'https://fullnode.testnet.sui.io:443',
      chainId: 'testnet'
    },
    mainnet: {
      url: 'https://fullnode.mainnet.sui.io:443',
      chainId: 'mainnet'
    }
  }
};

// Validate configuration
if (!NFT_STORE_CONFIG.PACKAGE_ID) {
    console.warn('Warning: NEXT_PUBLIC_PACKAGE_ID is not set in environment variables');
} 