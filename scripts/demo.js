/**
 * Demo Script - Simulates IP infringement detection
 */

import storyProtocol from '../src/modules/storyProtocol.js';
import scanner from '../src/modules/scanner.js';
import enforcement from '../src/modules/enforcement.js';
import logger from '../src/utils/logger.js';

async function runDemo() {
    console.log('🎬 IP Whisperer Demo\n');

    try {
        // 1. Initialize
        console.log('1️⃣ Initializing Story Protocol...');
        await storyProtocol.initialize();

        // 2. Register IP
        console.log('\n2️⃣ Registering test IP asset...');
        const ipResult = await storyProtocol.registerIP({
            name: 'Sigma Music Remix',
            description: 'Epic electronic music remix with heavy bass drops',
            mediaUrl: 'https://example.com/sigma-remix.mp3',
            contentHash: 'QmTest123...',
            keywords: ['music', 'remix', 'electronic', 'sigma'],
        });

        if (!ipResult.success) {
            throw new Error('IP registration failed');
        }

        console.log(`✅ IP registered: ${ipResult.ipId}`);

        // 3. Scan for infringements
        console.log('\n3️⃣ Scanning for infringements...');
        const mockIP = {
            ipId: ipResult.ipId,
            name: 'Sigma Music Remix',
            description: 'Epic electronic music remix with heavy bass drops',
            keywords: ['music', 'remix'],
        };

        const matches = await scanner.scanAll(mockIP);
        console.log(`✅ Found ${matches.length} potential matches`);

        if (matches.length > 0) {
            // 4. Generate enforcement messages
            console.log('\n4️⃣ Generating enforcement messages...');
            const violation = matches[0];

            const tones = await enforcement.generateAllTones(mockIP, violation);

            console.log('\n📝 Friendly Tone:');
            console.log(tones.friendly);

            console.log('\n📝 Vibe Tone:');
            console.log(tones.vibe);

            // 5. Create dispute
            console.log('\n5️⃣ Creating onchain dispute...');
            const disputeResult = await storyProtocol.createDispute(ipResult.ipId, violation);

            if (disputeResult.success) {
                console.log(`✅ Dispute created: ${disputeResult.disputeId}`);
            }
        }

        console.log('\n🎉 Demo complete!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Demo failed:', error.message);
        process.exit(1);
    }
}

runDemo();
