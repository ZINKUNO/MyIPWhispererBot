/**
 * IP Whisperer - Enforcement Engine Module
 * Generates enforcement actions (DMs, emails, dispute registrations)
 * Now with ABV.dev integration for GenAI IP Registration Challenge
 */

import OpenAI from 'openai';
import { ABVClient } from '@abvdev/client';
import axios from 'axios';
import config from '../config.js';
import logger from '../utils/logger.js';
import storyProtocol from './storyProtocol.js';

class EnforcementService {
    constructor() {
        // Initialize ABV client (primary)
        this.abv = null;
        if (config.api.abv.key) {
            this.abv = new ABVClient({
                apiKey: config.api.abv.key,
                baseUrl: config.api.abv.baseUrl,
                region: config.api.abv.region,
            });
            logger.info('✅ ABV client initialized (GenAI Challenge mode)');
        }

        // Fallback to OpenAI
        this.openai = new OpenAI({
            apiKey: config.api.openai,
        });
    }

    /**
   * Generate a friendly enforcement message using AI
   * @param {Object} ipAsset - Original IP asset
   * @param {Object} violation - Detected violation
   * @param {string} tone - Message tone: 'friendly', 'formal', 'vibe'
   * @returns {Promise<string>} - Generated message
   */
    async generateEnforcementMessage(ipAsset, violation, tone = 'friendly') {
        try {
            logger.info('✍️  Generating enforcement message...', { tone, provider: this.abv ? 'ABV' : 'OpenAI' });

            const prompt = this.buildPrompt(ipAsset, violation, tone);

            // Try ABV first (GenAI IP Registration Challenge)
            if (this.abv) {
                try {
                    logger.debug('🚀 Using ABV gateway (GenAI Challenge mode)');

                    const response = await this.abv.gateway.chat.completions.create({
                        provider: 'openai',
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are IP Whisperer, a friendly AI agent that helps creators protect their intellectual property. Generate concise, helpful messages that encourage collaboration over conflict.',
                            },
                            {
                                role: 'user',
                                content: prompt,
                            },
                        ],
                        temperature: 0.7,
                        max_tokens: 300,
                    });

                    const message = response.choices[0].message.content.trim();
                    logger.info('✅ Enforcement message generated via ABV');
                    return message;

                } catch (abvError) {
                    logger.warn('⚠️  ABV generation failed, falling back to OpenAI', { error: abvError.message });
                    // Continue to OpenAI fallback
                }
            }

            // Fallback to direct OpenAI
            logger.debug('Using direct OpenAI API');
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are IP Whisperer, a friendly AI agent that helps creators protect their intellectual property. Generate concise, helpful messages that encourage collaboration over conflict.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 300,
            });

            const message = response.choices[0].message.content.trim();
            logger.info('✅ Enforcement message generated via OpenAI');

            return message;
        } catch (error) {
            logger.error('❌ Failed to generate enforcement message', { error: error.message });
            // Fallback to template
            return this.getTemplateMessage(ipAsset, violation, tone);
        }
    }

    /**
     * Build AI prompt for message generation
     */
    buildPrompt(ipAsset, violation, tone) {
        let toneInstruction = '';

        switch (tone) {
            case 'vibe':
                toneInstruction = 'Use Gen-Z slang, emojis, and make it fun but clear about the IP claim.';
                break;
            case 'formal':
                toneInstruction = 'Use strictly professional, legalistic, and formal language. Be descriptive about the IP details.';
                break;
            default:
                toneInstruction = 'Be friendly, professional, and descriptive, encouraging collaboration.';
        }

        return `
Generate a DM message for someone who used copyrighted content without permission.

**Original IP Asset:**
- Name: ${ipAsset.name}
- Description: ${ipAsset.description}
- Registered on Story Protocol with ID: ${ipAsset.ipId}

**Violation Details:**
- Platform: ${violation.platform}
- Post URL: ${violation.url}
- Similarity: ${(violation.similarity * 100).toFixed(1)}%
- Engagement: ${violation.engagement} interactions

**Tone:** ${toneInstruction}

**Instructions:**
1. Start with a polite and appropriate greeting
2. Acknowledge their content quality
3. Clearly state that it uses registered IP, providing the IP Name and ID
4. Explain the situation formally but constructively
5. Offer options: License officially or set up royalty split
6. Include the Claim link: https://story.foundation/claim/${ipAsset.ipId}
7. Include the Block Explorer link to view the IP: https://aeneid.explorer.story.foundation/ipa/${ipAsset.ipId}
8. Keep it under 250 words
9. End professionally

Generate the message:
    `.trim();
    }

    /**
     * Fallback template message
     */
    getTemplateMessage(ipAsset, violation, tone) {
        if (tone === 'vibe') {
            return `
yo! 👋 

saw your post (${violation.url}) and it's actually fire 🔥 

but heads up—that's registered IP on Story Protocol (ID: ${ipAsset.ipId}). no drama tho! 

wanna make it legit? you can license it or we can split royalties here:
Claim: https://story.foundation/claim/${ipAsset.ipId}
View IP: https://aeneid.explorer.story.foundation/ipa/${ipAsset.ipId}

let's collab instead of beef 🤝

- IP Whisperer 🤫
      `.trim();
        }

        return `
Dear Content Creator,

I trust this message finds you well. I recently came across your post at ${violation.url} and wanted to acknowledge the quality of your content.

However, I must bring to your attention that this content utilizes "${ipAsset.name}", which is formally registered intellectual property on the Story Protocol (IP ID: ${ipAsset.ipId}).

We believe in fostering a collaborative ecosystem. To resolve this matter amicably and ensure proper usage rights, we invite you to:
- Obtain an official license
- Arrange for a royalty split
- Provide proper attribution

You may view the registered IP details here:
https://aeneid.explorer.story.foundation/ipa/${ipAsset.ipId}

To proceed with licensing or dispute resolution, please visit:
https://story.foundation/claim/${ipAsset.ipId}

We look forward to a positive resolution.

Sincerely,
IP Whisperer
    `.trim();
    }

    /**
     * Create a full enforcement action
     * @param {Object} ipAsset - Original IP
     * @param {Object} violation - Detected violation
     * @param {Object} options - Enforcement options
     * @returns {Promise<Object>} - Enforcement result
     */
    async enforce(ipAsset, violation, options = {}) {
        try {
            logger.info('🚨 Initiating enforcement action...', {
                ipId: ipAsset.ipId,
                violationUrl: violation.url,
            });

            const { tone = 'friendly', autoDispute = true, sendNotification = true } = options;

            // 1. Generate the message
            const message = await this.generateEnforcementMessage(ipAsset, violation, tone);

            // 2. Register dispute on Story Protocol (if enabled)
            let disputeResult = null;
            if (autoDispute) {
                disputeResult = await storyProtocol.createDispute(ipAsset.ipId, {
                    platform: violation.platform,
                    url: violation.url,
                    similarity: violation.similarity,
                    content: violation.content,
                    screenshot: violation.imageUrl || `https://placehold.co/800x600/png?text=${violation.platform}+Evidence`,
                });
            }

            // 3. Send notification (webhook, email, etc.)
            if (sendNotification && config.webhooks.alerts) {
                await this.sendAlert({
                    ipAsset,
                    violation,
                    message,
                    disputeId: disputeResult?.disputeId,
                });
            }

            const result = {
                success: true,
                message,
                disputeId: disputeResult?.disputeId,
                disputeTxHash: disputeResult?.txHash,
                timestamp: new Date().toISOString(),
            };

            logger.info('✅ Enforcement action completed', {
                disputeId: result.disputeId,
            });

            return result;
        } catch (error) {
            logger.error('❌ Enforcement action failed', { error: error.message });
            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Send alert notification
     */
    async sendAlert(data) {
        try {
            if (config.webhooks.alerts) {
                await axios.post(config.webhooks.alerts, {
                    text: `🚨 *IP Infringement Detected*\n\nIP: ${data.ipAsset.name}\nPlatform: ${data.violation.platform}\nURL: ${data.violation.url}\nSimilarity: ${(data.violation.similarity * 100).toFixed(1)}%\nDispute ID: ${data.disputeId || 'N/A'}`,
                    blocks: [
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: `*🚨 IP Infringement Alert*\n\n*Asset:* ${data.ipAsset.name}\n*Platform:* ${data.violation.platform}\n*Match:* ${(data.violation.similarity * 100).toFixed(1)}%`,
                            },
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: `*Generated Message:*\n${data.message}`,
                            },
                        },
                    ],
                });
                logger.debug('📤 Alert sent to webhook');
            }
        } catch (error) {
            logger.error('❌ Failed to send alert', { error: error.message });
        }
    }

    /**
     * Generate different tone variations for demo
     */
    async generateAllTones(ipAsset, violation) {
        const tones = ['friendly', 'formal', 'vibe'];
        const messages = {};

        for (const tone of tones) {
            messages[tone] = await this.generateEnforcementMessage(ipAsset, violation, tone);
        }

        return messages;
    }
}

// Export singleton instance
export const enforcement = new EnforcementService();
export default enforcement;
