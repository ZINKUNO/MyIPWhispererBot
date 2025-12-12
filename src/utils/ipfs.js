import { PinataSDK } from "pinata-web3";
import logger from "./logger.js";

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: "example-gateway.mypinata.cloud", // Optional: Add gateway if needed, or rely on public ones
});

/**
 * Upload JSON metadata to IPFS via Pinata
 * @param {Object} jsonMetadata - The JSON object to upload
 * @returns {Promise<string>} - The IPFS Hash (CID)
 */
export async function uploadJSONToIPFS(jsonMetadata) {
    try {
        if (!process.env.PINATA_JWT) {
            throw new Error("PINATA_JWT is missing in environment variables.");
        }
        const { IpfsHash } = await pinata.upload.json(jsonMetadata);
        logger.info(`Uploaded JSON to IPFS: ${IpfsHash}`);
        return IpfsHash;
    } catch (error) {
        logger.error("Failed to upload JSON to IPFS", { error: error.message });
        throw error;
    }
}
