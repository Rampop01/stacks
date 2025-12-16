import { ChainhooksClient, CHAINHOOKS_BASE_URL } from '@hirosystems/chainhooks-client';

// Initialize the Chainhooks client with environment variables
const chainhooksClient = new ChainhooksClient({
  baseUrl: process.env.NEXT_PUBLIC_CHAINHOOKS_BASE_URL || CHAINHOOKS_BASE_URL.testnet,
  apiKey: process.env.NEXT_PUBLIC_CHAINHOOKS_API_KEY || '',
});

export default chainhooksClient;
