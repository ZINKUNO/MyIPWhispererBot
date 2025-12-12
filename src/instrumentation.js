/**
 * ABV Tracing Instrumentation
 * Must be loaded FIRST before any other modules
 */

import { NodeSDK } from "@opentelemetry/sdk-node";
import { ABVSpanProcessor } from "@abvdev/otel";
import config from './config.js';

const sdk = new NodeSDK({
    spanProcessors: [
        new ABVSpanProcessor({
            apiKey: config.api.abv.key,
            baseUrl: config.api.abv.baseUrl,
            exportMode: "immediate",
        })
    ],
});

sdk.start();

console.log('✅ ABV tracing initialized');

export default sdk;
