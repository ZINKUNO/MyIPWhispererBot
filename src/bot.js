/**
 * IP Whisperer - Telegram Bot Interface
 */

import { Telegraf, Markup } from 'telegraf';
import config from './config.js';
import logger from './utils/logger.js';
import orchestrator from './orchestrator.js';

class IPWhispererBot {
    constructor() {
        this.bot = new Telegraf(config.api.telegram);
        this.userSessions = new Map();
        this.setupHandlers();
    }

    setupHandlers() {
        this.bot.start((ctx) => {
            ctx.replyWithMarkdown(`🤫 *IP Whisperer* at your service!\n\n*Commands:*\n/protect - Protect new IP\n/status - Check status\n/alerts - View alerts\n/help - Show help`);
        });

        this.bot.command('protect', async (ctx) => {
            const userId = ctx.from.id.toString();
            this.userSessions.set(userId, { state: 'awaiting_name', data: {} });
            ctx.reply('🛡️ What\'s the name of your creative work?');
        });

        this.bot.command('status', async (ctx) => {
            const userId = ctx.from.id.toString();
            const status = orchestrator.getMonitoringStatus(userId);
            if (status.total === 0) {
                ctx.reply('📭 No protected assets yet. Use /protect!');
                return;
            }
            let msg = `📊 *Protected Assets* (${status.total})\n\n`;
            status.assets.forEach((a, i) => {
                msg += `${i + 1}. ${a.name}\n   ID: \`${a.ipId}\`\n   Alerts: ${a.pendingViolations}\n\n`;
            });
            ctx.replyWithMarkdown(msg);
        });

        this.bot.command('alerts', async (ctx) => {
            const userId = ctx.from.id.toString();
            const violations = orchestrator.getPendingViolations(userId);
            if (violations.length === 0) {
                ctx.reply('✅ No alerts!');
                return;
            }
            for (const item of violations) {
                let msg = `🚨 *${item.ipAsset.name}*\n\n`;
                item.violations.slice(0, 3).forEach((v, i) => {
                    msg += `${i + 1}. ${v.platform} - ${(v.similarity * 100).toFixed(1)}%\n   ${v.url}\n\n`;
                });
                msg += `Use /enforce!`;
                await ctx.replyWithMarkdown(msg);
            }
        });

        this.bot.command('enforce', async (ctx) => {
            const userId = ctx.from.id.toString();
            const violations = orchestrator.getPendingViolations(userId);
            if (violations.length === 0) {
                ctx.reply('No violations to enforce.');
                return;
            }
            const first = violations[0];
            ctx.replyWithMarkdown(
                `🚨 *Enforcement*\n\nAsset: ${first.ipAsset.name}\n\nChoose style:`,
                Markup.inlineKeyboard([
                    [Markup.button.callback('😊 Friendly', `enforce_friendly_${first.ipAsset.ipId}`)],
                    [Markup.button.callback('📜 Formal', `enforce_formal_${first.ipAsset.ipId}`)],
                    [Markup.button.callback('🔥 Vibe', `enforce_vibe_${first.ipAsset.ipId}`)],
                ])
            );
        });

        this.bot.action(/enforce_(\w+)_(.+)/, async (ctx) => {
            const tone = ctx.match[1];
            const ipId = ctx.match[2];
            ctx.answerCbQuery();
            ctx.reply('⚙️ Processing...');
            const userId = ctx.from.id.toString();
            const violations = orchestrator.getPendingViolations(userId);
            const item = violations.find(v => v.ipAsset.ipId === ipId);
            if (!item) return ctx.reply('❌ Not found');
            const result = await orchestrator.handleEnforcement(ipId, item.violations[0], { tone, autoDispute: true });
            ctx.reply(result.success ? result.message : '❌ Failed');
            if (result.success) orchestrator.clearPendingViolations(ipId);
        });

        this.bot.on('text', async (ctx) => {
            const userId = ctx.from.id.toString();
            const session = this.userSessions.get(userId);
            if (!session) return ctx.reply('Type /help to see available commands!');

            const text = ctx.message.text;

            // Step 1: IP Name
            if (session.state === 'awaiting_name') {
                session.data.name = text;
                session.state = 'awaiting_description';
                ctx.reply('📝 Great! Now provide a detailed description of your IP:\n\n(Include what makes it unique, key features, etc.)');
            }
            // Step 2: Description
            else if (session.state === 'awaiting_description') {
                session.data.description = text;
                session.state = 'awaiting_category';
                ctx.reply('🏷️ What category does this IP belong to?\n\nExamples:\n- Music\n- Art/Design\n- Video/Film\n- Software/Code\n- Writing/Text\n- Photography\n- 3D Model\n- Other');
            }
            // Step 3: Category
            else if (session.state === 'awaiting_category') {
                session.data.category = text;
                session.state = 'awaiting_creator';
                ctx.reply('👤 Creator information:\n\nEnter the creator name or wallet address\n\n(This will be registered as the IP owner on Story Protocol)');
            }
            // Step 4: Creator
            else if (session.state === 'awaiting_creator') {
                session.data.creator = text;
                session.state = 'awaiting_media';
                ctx.reply('🖼️ Media URL (optional):\n\nProvide a DIRECT link to your image (must end in .jpg, .png, etc.):\n\nExample: https://i.imgur.com/example.jpg\n\nOr type "skip" to use a default placeholder');
            }
            // Step 5: Media URL
            else if (session.state === 'awaiting_media') {
                if (text.toLowerCase() !== 'skip') {
                    session.data.mediaUrl = text;
                }
                session.state = 'awaiting_tags';
                ctx.reply('🏷️ Tags/Keywords (optional):\n\nEnter keywords separated by commas for better searchability\n\nExamples: "electronic, remix, synthwave"\n\nOr type "skip" to skip');
            }
            // Step 6: Tags/Keywords
            else if (session.state === 'awaiting_tags') {
                if (text.toLowerCase() !== 'skip') {
                    session.data.keywords = text.split(',').map(k => k.trim()).filter(k => k);
                } else {
                    session.data.keywords = [];
                }
                session.state = 'awaiting_license';
                ctx.reply('⚖️ License Type:\n\n1️⃣ Commercial Use Allowed\n2️⃣ Non-Commercial Only\n3️⃣ No Derivatives  \n4️⃣ Custom Terms\n\nEnter 1, 2, 3, or 4');
            }
            // Step 7: License Type
            else if (session.state === 'awaiting_license') {
                const licenseMap = {
                    '1': 'Commercial',
                    '2': 'Non-Commercial',
                    '3': 'No-Derivatives',
                    '4': 'Custom'
                };
                session.data.licenseType = licenseMap[text] || 'Commercial';

                // Show confirmation
                const confirmMsg = `
� *Please Confirm Your IP Registration*

*Name:* ${session.data.name}
*Description:* ${session.data.description}
*Category:* ${session.data.category}
*Creator:* ${session.data.creator}
*Media URL:* ${session.data.mediaUrl || 'Not provided'}
*Keywords:* ${session.data.keywords?.join(', ') || 'None'}
*License:* ${session.data.licenseType}

Type "confirm" to register or "cancel" to start over.
                `.trim();

                session.state = 'awaiting_confirmation';
                ctx.replyWithMarkdown(confirmMsg);
            }
            // Step 8: Confirmation
            else if (session.state === 'awaiting_confirmation') {
                if (text.toLowerCase() === 'confirm') {
                    ctx.reply('�🔄 Registering your IP on Story Protocol blockchain...\n\nThis may take a few seconds ⏳');

                    const result = await orchestrator.protectIP(userId, session.data);

                    if (result.success) {
                        let successMsg = `
✅ *IP Successfully Registered!*

*IP ID:* \`${result.ipAsset.ipId}\`
*Transaction:* \`${result.ipAsset.txHash}\`

📊 *View on Explorer:*
https://aeneid.explorer.story.foundation/ipa/${result.ipAsset.ipId}

${result.ipAsset.metadata?.ipIpfsHash ? `*IP Metadata IPFS:* \`ipfs://${result.ipAsset.metadata.ipIpfsHash}\`` : ''}
${result.ipAsset.metadata?.nftIpfsHash ? `*NFT Metadata IPFS:* \`ipfs://${result.ipAsset.metadata.nftIpfsHash}\`` : ''}

🔍 Monitoring started! I'll scan for infringements every 5 minutes.
                        `.trim();

                        // Add initial alerts if found
                        if (result.initialScan && result.initialScan.matches > 0) {
                            successMsg += `\n\n🚨 *WARNING: ${result.initialScan.matches} Potential Infringements Found Immediately!*`;

                            result.initialScan.results.forEach((match, i) => {
                                successMsg += `\n\n${i + 1}. *${match.platform}* (${(match.similarity * 100).toFixed(0)}% match)\n${match.url}`;
                            });

                            successMsg += `\n\nUse /enforce to take action!`;
                        } else {
                            successMsg += `\n\nUse /status to check your protected IPs anytime.`;
                        }

                        ctx.replyWithMarkdown(successMsg);
                    } else {
                        ctx.reply(`❌ Registration failed: ${result.error}\n\nPlease try again with /protect`);
                    }

                    this.userSessions.delete(userId);
                } else if (text.toLowerCase() === 'cancel') {
                    this.userSessions.delete(userId);
                    ctx.reply('❌ Registration cancelled. Use /protect to start again.');
                } else {
                    ctx.reply('Please type "confirm" to proceed or "cancel" to start over.');
                }
            }
        });

        this.bot.catch((err, ctx) => {
            logger.error('Bot error', { error: err.message });
            ctx.reply('😅 Error! Try again.');
        });
    }

    async start() {
        logger.info('🤖 Starting bot...');
        await orchestrator.initialize();
        await this.bot.launch();
        logger.info('✅ Bot running!');
        process.once('SIGINT', () => this.stop('SIGINT'));
        process.once('SIGTERM', () => this.stop('SIGTERM'));
    }

    async stop(signal) {
        logger.info(`${signal} - stopping...`);
        orchestrator.stopBackgroundScanning();
        this.bot.stop(signal);
        process.exit(0);
    }
}

const bot = new IPWhispererBot();
bot.start().catch((error) => {
    logger.error('Fatal', { error: error.message });
    process.exit(1);
});
