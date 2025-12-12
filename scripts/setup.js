/**
 * Setup Script for IP Whisperer
 * Helps users configure the project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
    console.log('🤫 IP Whisperer Setup\n');

    // Check if .env exists
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const overwrite = await question('.env already exists. Overwrite? (y/n): ');
        if (overwrite.toLowerCase() !== 'y') {
            console.log('Setup cancelled.');
            rl.close();
            return;
        }
    }

    console.log('\nLet\'s configure your environment...\n');

    const telegramToken = await question('Telegram Bot Token (from @BotFather): ');
    const privateKey = await question('Wallet Private Key (without 0x): ');
    const openaiKey = await question('OpenAI API Key: ');
    const twitterToken = await question('Twitter Bearer Token (optional, press enter to skip): ');

    const envContent = `# IP Whisperer Configuration
# Generated on ${new Date().toISOString()}

# Blockchain
STORY_RPC_URL=https://testnet.storyrpc.io
WALLET_PRIVATE_KEY=${privateKey}
STORY_CHAIN_ID=1513

# API Keys
OPENAI_API_KEY=${openaiKey}
TELEGRAM_BOT_TOKEN=${telegramToken}
${twitterToken ? `TWITTER_BEARER_TOKEN=${twitterToken}` : '# TWITTER_BEARER_TOKEN='}

# App Settings
SCAN_INTERVAL_MINUTES=5
SIMILARITY_THRESHOLD=0.80
MAX_SCAN_RESULTS=10
DEBUG_MODE=true
`;

    fs.writeFileSync(envPath, envContent);

    // Create logs directory
    const logsDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    console.log('\n✅ Setup complete!\n');
    console.log('Next steps:');
    console.log('1. npm install');
    console.log('2. npm start\n');

    rl.close();
}

setup().catch(console.error);
