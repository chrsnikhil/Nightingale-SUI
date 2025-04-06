import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import fs from 'fs';

async function main() {
    // Initialize SUI client
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    // Create transaction block
    const tx = new TransactionBlock();
    
    // Read the compiled Move module
    const moduleBytes = fs.readFileSync('./move/wager/build/wager/bytecode_modules/wager.mv');
    
    // Publish the package
    const [upgradeCap] = tx.publish({
        modules: [
            Array.from(moduleBytes)
        ],
        dependencies: [],
    });

    // Keep the upgrade cap
    tx.transferObjects([upgradeCap], tx.pure('0x031bbebe4849662736649e76e852bcc502d37502f82f91d55c6695b22c9cd3c0'));

    console.log('Transaction block to sign:', tx.serialize());
}

main().catch(console.error); 