import { createPublicClient, http } from 'viem';
import { polygonMumbai } from 'viem/chains';

// Initialize public client for reading blockchain data
export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

// Re-export client-side functions
export * from './client'; 