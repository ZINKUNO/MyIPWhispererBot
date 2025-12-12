/**
 * IP Whisperer - Semantic Scanning Module
 * Scans social platforms for potential IP infringements using semantic similarity
 */

import axios from 'axios';
import natural from 'natural';
import config from '../config.js';
import logger from '../utils/logger.js';

const { TfIdf, PorterStemmer } = natural;

class ScannerService {
    constructor() {
        this.tfidf = new TfIdf();
        this.cache = new Map(); // Simple in-memory cache
    }

    /**
     * Scan Google for potential infringements (Primary method - no rate limits)
     * @param {Object} ipAsset - The IP asset to protect
     * @returns {Promise<Array>} - Array of potential matches
     */
    async scanGoogle(ipAsset) {
        try {
            logger.info('🔍 Scanning Google for infringements...', {
                ipName: ipAsset.name,
            });

            const { name, description } = ipAsset;

            // Build search query
            const searchQuery = `"${name}" ${description.substring(0, 50)}`;

            // Check cache first
            const cacheKey = `google:${searchQuery}`;
            if (this.cache.has(cacheKey)) {
                logger.debug('📦 Returning cached Google results');
                return this.cache.get(cacheKey);
            }

            // Use Google Custom Search API
            let results = [];

            if (config.api.googleSearchKey && config.api.googleSearchEngineId) {
                results = await this.fetchGoogleResults(searchQuery);
            } else {
                logger.warn('⚠️ Google Search API not configured. Set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID in .env');
                return [];
            }

            // Filter by similarity
            const matches = await this.filterBySimilarity(ipAsset, results);

            // Cache results for 10 minutes
            this.cache.set(cacheKey, matches);
            setTimeout(() => this.cache.delete(cacheKey), 10 * 60 * 1000);

            logger.info(`✅ Google scan complete: ${matches.length} potential matches found`);

            return matches;
        } catch (error) {
            logger.error('❌ Google scan failed', { error: error.message });
            return [];
        }
    }

    /**
     * Fetch results from Google Custom Search API
     */
    async fetchGoogleResults(query) {
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: config.api.googleSearchKey,
                    cx: config.api.googleSearchEngineId,
                    q: query,
                    num: Math.min(config.app.maxScanResults, 10), // Google max is 10
                },
            });

            if (!response.data.items) {
                logger.info('No Google results found');
                return [];
            }

            return response.data.items.map(item => ({
                id: item.link,
                platform: 'Web',
                content: `${item.title} ${item.snippet}`,
                url: item.link,
                engagement: 0, // Google doesn't provide engagement metrics
                createdAt: new Date().toISOString(),
                imageUrl: item.pagemap?.cse_image?.[0]?.src || null,
            }));
        } catch (error) {
            logger.error('❌ Google API error', { error: error.message });
            throw error;
        }
    }

    /**
     * Scan Twitter/X for potential infringements
     * @param {Object} ipAsset - The IP asset to protect
     * @returns {Promise<Array>} - Array of potential matches
     */
    async scanTwitter(ipAsset) {
        try {
            logger.info('🔍 Scanning Twitter/X for infringements...', {
                ipName: ipAsset.name,
            });

            const { name, description, keywords = [] } = ipAsset;

            // Build search query
            const searchQuery = this.buildSearchQuery(name, description, keywords);

            // Check cache first
            const cacheKey = `twitter:${searchQuery}`;
            if (this.cache.has(cacheKey)) {
                logger.debug('📦 Returning cached Twitter results');
                return this.cache.get(cacheKey);
            }

            // Use Twitter API v2 for semantic search
            let results = [];

            if (config.api.twitter) {
                results = await this.fetchTwitterResults(searchQuery);
            } else {
                logger.error('❌ Twitter API not configured! Set TWITTER_BEARER_TOKEN in .env');
                throw new Error('Twitter API credentials required - no mock data available');
            }

            // Filter by similarity
            const matches = await this.filterBySimilarity(ipAsset, results);

            // Cache results for 5 minutes
            this.cache.set(cacheKey, matches);
            setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);

            logger.info(`✅ Twitter scan complete: ${matches.length} potential matches found`);

            return matches;
        } catch (error) {
            logger.error('❌ Twitter scan failed', { error: error.message });
            return []; // Return empty array instead of throwing
        }
    }

    /**
     * Fetch actual results from Twitter API
     */
    /**
     * Fetch actual results from Twitter API with retry logic
     */
    async fetchTwitterResults(query) {
        try {
            const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
                headers: {
                    'Authorization': `Bearer ${config.api.twitter}`,
                },
                params: {
                    query,
                    max_results: config.app.maxScanResults,
                    'tweet.fields': 'created_at,public_metrics,author_id',
                    'expansions': 'author_id',
                },
            });

            return response.data.data ? response.data.data.map(tweet => ({
                id: tweet.id,
                platform: 'Twitter',
                content: tweet.text,
                url: `https://twitter.com/i/web/status/${tweet.id}`,
                engagement: tweet.public_metrics.like_count + tweet.public_metrics.retweet_count,
                createdAt: tweet.created_at,
            })) : [];
        } catch (error) {
            // Handle Rate Limits (429) - Fail fast, don't retry
            if (error.response && error.response.status === 429) {
                logger.warn('⚠️ Twitter rate limit hit. Skipping Twitter scan for now.');
                return []; // Return empty results instead of throwing/retrying
            }

            logger.error('❌ Twitter API error', { error: error.message });
            // Don't throw, just return empty to allow other scans to proceed
            return [];
        }
    }

    /**
     * Calculate semantic similarity between IP and potential infringement
     * Uses TF-IDF and cosine similarity
     */
    async calculateSimilarity(originalText, comparisonText) {
        // Add documents to TF-IDF
        const tfidf = new TfIdf();
        tfidf.addDocument(originalText.toLowerCase());
        tfidf.addDocument(comparisonText.toLowerCase());

        // Calculate cosine similarity
        const terms1 = this.getTermVector(tfidf, 0);
        const terms2 = this.getTermVector(tfidf, 1);

        return this.cosineSimilarity(terms1, terms2);
    }

    /**
     * Get term vector from TF-IDF
     */
    getTermVector(tfidf, docIndex) {
        const vector = {};
        tfidf.listTerms(docIndex).forEach(term => {
            vector[term.term] = term.tfidf;
        });
        return vector;
    }

    /**
     * Calculate cosine similarity between two vectors
     */
    cosineSimilarity(vec1, vec2) {
        const allTerms = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);

        let dotProduct = 0;
        let mag1 = 0;
        let mag2 = 0;

        allTerms.forEach(term => {
            const val1 = vec1[term] || 0;
            const val2 = vec2[term] || 0;

            dotProduct += val1 * val2;
            mag1 += val1 * val1;
            mag2 += val2 * val2;
        });

        if (mag1 === 0 || mag2 === 0) return 0;

        return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
    }

    /**
     * Filter results by similarity threshold
     */
    async filterBySimilarity(ipAsset, results) {
        const { description, name } = ipAsset;
        const referenceText = `${name} ${description}`;

        const matches = [];

        for (const result of results) {
            const similarity = await this.calculateSimilarity(referenceText, result.content);
            logger.debug(`Similarity score: ${similarity.toFixed(2)} for content: ${result.content.substring(0, 30)}...`);

            if (similarity >= config.app.similarityThreshold) {
                matches.push({
                    ...result,
                    similarity,
                    matched: true,
                });
            }
        }

        // Sort by similarity (highest first)
        return matches.sort((a, b) => b.similarity - a.similarity);
    }

    /**
     * Build optimized search query
     */
    buildSearchQuery(name, description, keywords) {
        const terms = [
            ...name.split(' '),
            ...keywords,
        ].filter(t => t.length > 2);

        return terms.slice(0, 5).join(' OR ');
    }

    /**
     * Scan TikTok - No public API available
     */
    async scanTikTok(ipAsset) {
        logger.error('❌ TikTok API not available - no public API exists for content scanning');
        return []; // Return empty results - no mocking
    }

    /**
     * Run comprehensive scan across all platforms
     */
    async scanAll(ipAsset) {
        logger.info('🌐 Running comprehensive scan across platforms...');

        // Use Google as primary (no rate limits), Twitter as optional secondary
        const scanPromises = [
            this.scanGoogle(ipAsset), // Primary - Google Custom Search
        ];

        // Only add Twitter if we want additional coverage (may hit rate limits)
        if (config.api.twitter) {
            scanPromises.push(this.scanTwitter(ipAsset));
        }

        const results = await Promise.allSettled(scanPromises);

        const allResults = results
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value);

        logger.info(`✅ Comprehensive scan complete: ${allResults.length} total matches`);

        return allResults;
    }

    /**
     * Generate mock results for demo/testing
     * Tailored to the specific niche of the IP asset
     */
    getMockResults(ipAsset, platform = 'Twitter') {
        const { name, description, keywords = [] } = ipAsset;
        const combinedText = `${name} ${description} ${keywords.join(' ')}`.toLowerCase();

        // Detect Niche
        let niche = 'general';
        if (combinedText.match(/music|song|beat|audio|sound|track/)) niche = 'music';
        else if (combinedText.match(/art|design|illustration|drawing|nft|image/)) niche = 'art';
        else if (combinedText.match(/code|software|app|bot|script|algorithm/)) niche = 'tech';
        else if (combinedText.match(/video|movie|film|clip|stream/)) niche = 'video';
        else if (combinedText.match(/book|text|novel|story|writing/)) niche = 'writing';

        const mocks = [];
        const count = Math.floor(Math.random() * 2) + 1; // 1 or 2 results

        for (let i = 0; i < count; i++) {
            let content = '';
            let engagement = 0;
            let url = '';

            if (platform === 'Twitter') {
                engagement = Math.floor(Math.random() * 5000) + 100;
                url = `https://twitter.com/user_${Math.floor(Math.random() * 10000)}/status/${Date.now()}`;

                switch (niche) {
                    case 'music':
                        content = `Just found this crazy beat "${name}"! It's literally ${description}. #music #vibes`;
                        break;
                    case 'tech':
                        content = `Anyone seen this "${name}" tool? It's ${description}. Is this open source? #web3 #tech`;
                        break;
                    case 'art':
                        content = `This NFT art style looks exactly like "${name}"! ${description} Stealing? 🎨 #nft #art`;
                        break;
                    default:
                        content = `Yo, this content looks super similar to "${name}". ${description} much? 🤔`;
                }
            } else if (platform === 'TikTok') {
                engagement = Math.floor(Math.random() * 50000) + 1000;
                url = `https://www.tiktok.com/@tiktoker_${Math.floor(Math.random() * 1000)}/video/${Date.now()}`;

                switch (niche) {
                    case 'music':
                        content = `Dancing to this leaked track "${name}"! It matches ${description} perfectly! 💃🕺 #dance #viral`;
                        break;
                    case 'tech':
                        content = `POV: You found the ultimate hack with "${name}" which is ${description} 💻✨ #coding #tech #lifehack`;
                        break;
                    case 'art':
                        content = `Speedpainting inspired by "${name}"... ${description} or is it a copy? 🖌️ #art #drawing`;
                        break;
                    default:
                        content = `Story time! I found this thing called "${name}" - ${description} - and it's wild! 🤯 #storytime #fyp`;
                }
            }

            mocks.push({
                id: `mock_${platform}_${i}_${Date.now()}`,
                platform,
                content,
                url,
                engagement,
                createdAt: new Date().toISOString(),
                imageUrl: `https://placehold.co/600x400/png?text=${platform}+Content+${i + 1}`
            });
        }

        return mocks;
    }
}

// Export singleton instance
export const scanner = new ScannerService();
export default scanner;
