/**
 * IP Whisperer - Agent Orchestrator
 * Coordinates all modules and manages the agent workflow
 */

import cron from 'node-cron';
import config from './config.js';
import logger from './utils/logger.js';
import storyProtocol from './modules/storyProtocol.js';
import scanner from './modules/scanner.js';
import enforcement from './modules/enforcement.js';

class AgentOrchestrator {
    constructor() {
        this.sessions = new Map(); // User sessions
        this.monitoredAssets = new Map(); // IP assets being monitored
        this.scanJob = null;
    }

    /**
     * Initialize the orchestrator
     */
    async initialize() {
        try {
            logger.info('🚀 Initializing IP Whisperer Agent...');

            // Initialize Story Protocol
            await storyProtocol.initialize();

            // Start background scanning
            this.startBackgroundScanning();

            logger.info('✅ Agent orchestrator ready!');
        } catch (error) {
            logger.error('❌ Failed to initialize orchestrator', { error: error.message });
            throw error;
        }
    }

    /**
     * Handle user request to register and protect IP
     * @param {string} userId - User identifier
     * @param {Object} ipData - IP asset data
     * @returns {Promise<Object>} - Result
     */
    async protectIP(userId, ipData) {
        try {
            logger.info('🛡️ Processing IP protection request...', { userId });

            // 1. Register IP on Story Protocol
            const registrationResult = await storyProtocol.registerIP({
                name: ipData.name,
                description: ipData.description,
                mediaUrl: ipData.mediaUrl,
                contentHash: ipData.contentHash,
                attributes: ipData.attributes || [],
            });

            if (!registrationResult.success) {
                return {
                    success: false,
                    message: '❌ Failed to register IP on Story Protocol',
                    error: registrationResult.error,
                };
            }

            const ipAsset = {
                ipId: registrationResult.ipId,
                userId,
                ...ipData,
                txHash: registrationResult.txHash,
                registeredAt: new Date().toISOString(),
            };

            // 2. Add to monitoring list
            this.monitoredAssets.set(registrationResult.ipId, ipAsset);

            // 3. Run immediate scan
            const scanResults = await scanner.scanAll(ipAsset);

            logger.info('✅ IP protection activated', {
                ipId: ipAsset.ipId,
                matches: scanResults.length,
            });

            return {
                success: true,
                message: `✅ IP registered and protected!\n\nIP ID: ${ipAsset.ipId}\nTransaction: ${ipAsset.txHash}\n\nNow monitoring for infringements... 🔭`,
                ipAsset,
                initialScan: {
                    matches: scanResults.length,
                    results: scanResults.slice(0, 3), // Return top 3
                },
            };
        } catch (error) {
            logger.error('❌ IP protection failed', { error: error.message });
            return {
                success: false,
                message: '❌ Something went wrong',
                error: error.message,
            };
        }
    }

    /**
     * Handle enforcement request
     * @param {string} ipId - IP asset ID
     * @param {Object} violation - Violation details
     * @param {Object} options - Enforcement options
     * @returns {Promise<Object>} - Enforcement result
     */
    async handleEnforcement(ipId, violation, options = {}) {
        try {
            const ipAsset = this.monitoredAssets.get(ipId);

            if (!ipAsset) {
                return {
                    success: false,
                    message: '❌ IP asset not found in monitoring list',
                };
            }

            const result = await enforcement.enforce(ipAsset, violation, options);

            return {
                success: result.success,
                message: result.success
                    ? `✅ Enforcement action completed!\n\nDispute ID: ${result.disputeId}\n\n**Message to send:**\n\n${result.message}`
                    : '❌ Enforcement failed',
                ...result,
            };
        } catch (error) {
            logger.error('❌ Enforcement handling failed', { error: error.message });
            return {
                success: false,
                message: '❌ Enforcement failed',
                error: error.message,
            };
        }
    }

    /**
     * Start background scanning for all monitored assets
     */
    startBackgroundScanning() {
        const intervalMinutes = config.app.scanIntervalMinutes;

        // Run every X minutes (configured in .env)
        this.scanJob = cron.schedule(`*/${intervalMinutes} * * * *`, async () => {
            logger.info('🔄 Running scheduled scan for all monitored assets...');

            for (const [ipId, ipAsset] of this.monitoredAssets) {
                try {
                    const matches = await scanner.scanAll(ipAsset);

                    if (matches.length > 0) {
                        logger.warn(`⚠️ Found ${matches.length} potential infringements for ${ipAsset.name}`, {
                            ipId,
                        });

                        // Store matches for user notification
                        if (!ipAsset.pendingViolations) {
                            ipAsset.pendingViolations = [];
                        }
                        ipAsset.pendingViolations.push(...matches);
                    }
                } catch (error) {
                    logger.error(`❌ Scan failed for ${ipId}`, { error: error.message });
                }
            }

            logger.info('✅ Scheduled scan complete');
        });

        logger.info(`⏰ Background scanning started (every ${intervalMinutes} minutes)`);
    }

    /**
     * Stop background scanning
     */
    stopBackgroundScanning() {
        if (this.scanJob) {
            this.scanJob.stop();
            logger.info('⏸️ Background scanning stopped');
        }
    }

    /**
     * Get status of all monitored assets
     */
    getMonitoringStatus(userId = null) {
        const assets = Array.from(this.monitoredAssets.values());

        const filtered = userId
            ? assets.filter(a => a.userId === userId)
            : assets;

        return {
            total: filtered.length,
            assets: filtered.map(a => ({
                ipId: a.ipId,
                name: a.name,
                registeredAt: a.registeredAt,
                pendingViolations: a.pendingViolations?.length || 0,
            })),
        };
    }

    /**
     * Get pending violations for a user
     */
    getPendingViolations(userId) {
        const userAssets = Array.from(this.monitoredAssets.values())
            .filter(a => a.userId === userId);

        const violations = [];

        for (const asset of userAssets) {
            if (asset.pendingViolations && asset.pendingViolations.length > 0) {
                violations.push({
                    ipAsset: {
                        ipId: asset.ipId,
                        name: asset.name,
                    },
                    violations: asset.pendingViolations,
                });
            }
        }

        return violations;
    }

    /**
     * Clear pending violations after user acknowledgment
     */
    clearPendingViolations(ipId) {
        const asset = this.monitoredAssets.get(ipId);
        if (asset) {
            asset.pendingViolations = [];
        }
    }
}

// Export singleton instance
export const orchestrator = new AgentOrchestrator();
export default orchestrator;
