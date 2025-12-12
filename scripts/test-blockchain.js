/**
 * Test Script - Verify Real Blockchain Connection
 * Tests Story Protocol SDK connection to Aeneid testnet
 */

import { StoryClient, aeneid } from '@story-protocol/core-sdk';
import { http, createPublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

async function testBlockchainConnection() {
    console.log('🔗 Testing Story Protocol Blockchain Connection\n');
    console.log('='.repeat(60));

    try {
        // 1. Test RPC Connection
        console.log('\n1️⃣ Testing RPC Connection...');
        const rpcUrl = process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io';
        console.log(`   RPC URL: ${rpcUrl}`);

        const publicClient = createPublicClient({
            chain: aeneid,
            transport: http(rpcUrl),
        });

        const blockNumber = await publicClient.getBlockNumber();
        console.log(`   ✅ Connected! Current block: ${blockNumber}`);

        // 2. Test Account Setup
        console.log('\n2️⃣ Testing Account Setup...');
        if (!process.env.WALLET_PRIVATE_KEY) {
            throw new Error('WALLET_PRIVATE_KEY not found in .env file');
        }

        const account = privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY}`);
        console.log(`   ✅ Account loaded: ${account.address}`);

        // Get account balance
        const balance = await publicClient.getBalance({ address: account.address });
        console.log(`   Balance: ${balance} wei (${Number(balance) / 1e18} ETH)`);

        // 3. Test Story Protocol SDK Initialization
        console.log('\n3️⃣ Testing Story Protocol SDK...');

        const config = {
            account: account,
            transport: http(rpcUrl),
            chainId: 'aeneid', // Story Protocol Aeneid testnet chain identifier
        };

        console.log('   Initializing StoryClient...');
        const client = StoryClient.newClient(config);
        console.log('   ✅ Story Protocol SDK initialized successfully!');

        // 4. Test SDK Methods
        console.log('\n4️⃣ Testing SDK Methods...');
        console.log('   Available modules:');
        console.log(`   - ipAsset: ${typeof client.ipAsset}`);
        console.log(`   - license: ${typeof client.license}`);
        console.log(`   - dispute: ${typeof client.dispute}`);
        console.log(`   - royalty: ${typeof client.royalty}`);

        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL TESTS PASSED!');
        console.log('🎉 Real blockchain connection is working!\n');

        return true;
    } catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('❌ TEST FAILED!');
        console.error(`Error: ${error.message}`);
        console.error('\nStack trace:');
        console.error(error.stack);
        console.log('\n' + '='.repeat(60));

        if (error.message.includes('WALLET_PRIVATE_KEY')) {
            console.log('\n💡 TIP: Make sure you have a .env file with WALLET_PRIVATE_KEY set');
            console.log('   You can copy .env.example to .env and add your private key\n');
        }

        return false;
    }
}

// Run the test
testBlockchainConnection()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
