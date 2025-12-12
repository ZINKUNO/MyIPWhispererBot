/**
 * IP Whisperer - Configuration Module
 * Centralizes all environment variables and application settings
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

/**
 * Validates required environment variables
 */
function validateConfig() {
  const required = [
    'TELEGRAM_BOT_TOKEN',
    'WALLET_PRIVATE_KEY',
    'OPENAI_API_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please copy .env.example to .env and fill in the values.'
    );
  }
}

// Validate on load
validateConfig();

export const config = {
  // Blockchain Configuration
  blockchain: {
    rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
    privateKey: process.env.WALLET_PRIVATE_KEY,
    chainId: parseInt(process.env.STORY_CHAIN_ID || '1315'),
  },

  // API Keys
  api: {
    openai: process.env.OPENAI_API_KEY,
    abv: {
      key: process.env.ABV_API_KEY,
      baseUrl: process.env.ABV_BASE_URL || 'https://app.abv.dev',
      region: process.env.ABV_REGION || 'us',
    },
    telegram: process.env.TELEGRAM_BOT_TOKEN,
    twitter: process.env.TWITTER_BEARER_TOKEN,
    googleSearchKey: process.env.GOOGLE_API_KEY,
    googleSearchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
    crossmint: {
      clientId: process.env.CROSSMINT_CLIENT_ID,
      apiKey: process.env.CROSSMINT_API_KEY,
    },
    goldsky: process.env.GOLDSKY_API_KEY,
    pinataJwt: process.env.PINATA_JWT,
  },

  // Application Settings
  app: {
    scanIntervalMinutes: parseInt(process.env.SCAN_INTERVAL_MINUTES || '5'),
    similarityThreshold: parseFloat(process.env.SIMILARITY_THRESHOLD || '0.80'),
    maxScanResults: parseInt(process.env.MAX_SCAN_RESULTS || '10'),
    debugMode: process.env.DEBUG_MODE === 'true',
  },

  // Redis (optional)
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  // Webhooks
  webhooks: {
    main: process.env.WEBHOOK_URL,
    alerts: process.env.ALERT_WEBHOOK_URL,
  },
};

export default config;
