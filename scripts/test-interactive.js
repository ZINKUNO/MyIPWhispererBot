#!/usr/bin/env node
/**
 * Interactive Test Runner for IP Whisperer
 * Shows all available tests and lets you run them interactively
 */

import { createInterface } from 'readline';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Color codes for terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    red: '\x1b[31m',
};

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function print(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function printHeader(title) {
    console.log('\n' + '='.repeat(60));
    print(title, 'bright');
    console.log('='.repeat(60) + '\n');
}

function runCommand(command, args = [], cwd = projectRoot) {
    return new Promise((resolve, reject) => {
        print(`\n▶️  Running: ${command} ${args.join(' ')}`, 'cyan');
        console.log('─'.repeat(60));

        const child = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            shell: true
        });

        child.on('close', (code) => {
            console.log('─'.repeat(60));
            if (code === 0) {
                print('✅ Test completed successfully!\n', 'green');
                resolve(code);
            } else {
                print(`❌ Test failed with exit code ${code}\n`, 'red');
                resolve(code);
            }
        });

        child.on('error', (error) => {
            print(`❌ Error: ${error.message}\n`, 'red');
            reject(error);
        });
    });
}

function showMenu() {
    printHeader('🧪 IP WHISPERER - INTERACTIVE TEST RUNNER');

    print('Available Tests:', 'bright');
    console.log('');
    print('  1. 🔗 Blockchain Connection Test', 'cyan');
    print('     Tests Story Protocol RPC connection and SDK initialization', 'reset');
    print('     Duration: ~10 seconds', 'yellow');
    console.log('');

    print('  2. 🧩 Unit Tests (Jest)', 'cyan');
    print('     Runs all Jest unit tests for core modules', 'reset');
    print('     Duration: ~5 seconds', 'yellow');
    console.log('');

    print('  3. 🎬 Full Demo', 'cyan');
    print('     Simulates complete IP registration and enforcement workflow', 'reset');
    print('     Duration: ~30 seconds', 'yellow');
    console.log('');

    print('  4. 📊 All Tests (Sequential)', 'cyan');
    print('     Runs all tests one after another', 'reset');
    print('     Duration: ~45 seconds', 'yellow');
    console.log('');

    print('  5. 📖 View Testing Guide', 'cyan');
    print('     Opens the comprehensive testing documentation', 'reset');
    console.log('');

    print('  6. 🚀 Start Live Bot', 'cyan');
    print('     Starts the Telegram bot (runs until stopped)', 'reset');
    console.log('');

    print('  0. ❌ Exit', 'red');
    console.log('');
}

async function handleChoice(choice) {
    switch (choice) {
        case '1':
            printHeader('🔗 BLOCKCHAIN CONNECTION TEST');
            print('This test verifies:', 'bright');
            print('  ✓ RPC connection to Story Protocol Aeneid testnet');
            print('  ✓ Wallet account setup and balance');
            print('  ✓ Story Protocol SDK initialization');
            print('  ✓ SDK modules availability (ipAsset, license, dispute, royalty)');
            console.log('');
            await runCommand('node', ['scripts/test-blockchain.js']);
            break;

        case '2':
            printHeader('🧩 UNIT TESTS (JEST)');
            print('This test verifies:', 'bright');
            print('  ✓ Similarity calculation algorithm');
            print('  ✓ Enforcement message generation');
            print('  ✓ Configuration loading');
            console.log('');
            await runCommand('npm', ['test']);
            break;

        case '3':
            printHeader('🎬 FULL DEMO');
            print('This demo simulates:', 'bright');
            print('  1. Story Protocol initialization');
            print('  2. IP asset registration');
            print('  3. Infringement scanning');
            print('  4. Enforcement message generation (friendly & vibe tones)');
            print('  5. Onchain dispute creation');
            console.log('');
            await runCommand('node', ['scripts/demo.js']);
            break;

        case '4':
            printHeader('📊 RUNNING ALL TESTS');
            print('Running all tests sequentially...', 'bright');
            console.log('');

            await runCommand('node', ['scripts/test-blockchain.js']);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await runCommand('npm', ['test']);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await runCommand('node', ['scripts/demo.js']);

            printHeader('📊 ALL TESTS COMPLETE');
            print('✅ Test suite finished!', 'green');
            break;

        case '5':
            printHeader('📖 TESTING GUIDE');
            print('Opening TESTING_GUIDE.md...', 'cyan');
            console.log('');
            const guidePath = join(projectRoot, 'TESTING_GUIDE.md');

            // Try to open with common editors
            const editors = ['code', 'nano', 'vim', 'cat'];
            let opened = false;

            for (const editor of editors) {
                try {
                    if (editor === 'cat') {
                        await runCommand('cat', [guidePath]);
                        opened = true;
                        break;
                    } else {
                        await runCommand(editor, [guidePath]);
                        opened = true;
                        break;
                    }
                } catch (error) {
                    continue;
                }
            }

            if (!opened) {
                print(`📄 Guide location: ${guidePath}`, 'yellow');
            }
            break;

        case '6':
            printHeader('🚀 STARTING LIVE BOT');
            print('Starting Telegram bot...', 'bright');
            print('Press Ctrl+C to stop the bot', 'yellow');
            console.log('');
            await runCommand('npm', ['start']);
            break;

        case '0':
            printHeader('👋 GOODBYE');
            print('Thanks for testing IP Whisperer!', 'green');
            console.log('');
            rl.close();
            process.exit(0);
            break;

        default:
            print('❌ Invalid choice. Please select 0-6.', 'red');
    }
}

async function main() {
    let running = true;

    while (running) {
        showMenu();

        const choice = await new Promise((resolve) => {
            rl.question(colors.bright + 'Select a test (0-6): ' + colors.reset, resolve);
        });

        await handleChoice(choice.trim());

        if (choice.trim() !== '0') {
            console.log('');
            const continueChoice = await new Promise((resolve) => {
                rl.question(colors.bright + 'Press Enter to continue...' + colors.reset, resolve);
            });
        }
    }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log('\n');
    print('👋 Interrupted. Exiting...', 'yellow');
    rl.close();
    process.exit(0);
});

// Run the interactive menu
main().catch((error) => {
    print(`❌ Error: ${error.message}`, 'red');
    rl.close();
    process.exit(1);
});
