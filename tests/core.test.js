/**
 * Test Suite for IP Whisperer
 */

import { jest } from '@jest/globals';

describe('IP Whisperer Core Modules', () => {
    describe('Similarity Calculation', () => {
        test('should calculate high similarity for identical text', async () => {
            const { scanner } = await import('../src/modules/scanner.js');
            const text1 = 'Epic electronic music remix';
            const text2 = 'Epic electronic music remix';
            const similarity = await scanner.calculateSimilarity(text1, text2);
            expect(similarity).toBeGreaterThan(0.9);
        });

        test('should calculate low similarity for different text', async () => {
            const { scanner } = await import('../src/modules/scanner.js');
            const text1 = 'Epic electronic music remix';
            const text2 = 'Cooking pasta tutorial';
            const similarity = await scanner.calculateSimilarity(text1, text2);
            expect(similarity).toBeLessThan(0.3);
        });
    });

    describe('Enforcement Message Generation', () => {
        test('should generate template message when API fails', async () => {
            const { enforcement } = await import('../src/modules/enforcement.js');
            const ipAsset = {
                ipId: 'test-123',
                name: 'Test Asset',
                description: 'Test description'
            };
            const violation = {
                platform: 'Twitter',
                url: 'https://x.com/test',
                similarity: 0.9,
                engagement: 1000
            };

            const message = enforcement.getTemplateMessage(ipAsset, violation, 'friendly');
            expect(message).toContain('Test Asset');
            expect(message).toContain('test-123');
        });
    });

    describe('Configuration', () => {
        test('should load configuration from environment', async () => {
            const { config } = await import('../src/config.js');
            expect(config.app.scanIntervalMinutes).toBeDefined();
            expect(config.app.similarityThreshold).toBeGreaterThan(0);
        });
    });
});
