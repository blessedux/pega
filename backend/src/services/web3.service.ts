import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { polygonMumbai } from 'viem/chains';

// Initialize public client for reading blockchain data
const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

// Initialize wallet client for transactions
const walletClient = createWalletClient({
  chain: polygonMumbai,
  transport: custom((process.env.PRIVATE_KEY as `0x${string}`) || ''),
});

// ChileDAO Token Contract ABI (minimal for MVP)
const CHILE_TOKEN_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

// Escrow Contract ABI (minimal for MVP)
const ESCROW_ABI = [
  {
    name: 'createTask',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'taskId', type: 'bytes32' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'completeTask',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'taskId', type: 'bytes32' }],
    outputs: [],
  },
] as const;

// Contract addresses
const CHILE_TOKEN_ADDRESS = process.env.CHILE_TOKEN_ADDRESS as `0x${string}`;
const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS as `0x${string}`;

// Helper function to format amount to wei
function formatToWei(amount: number): bigint {
  return BigInt(amount * 1e18);
}

// Function to create a task in the escrow contract
export async function createTaskInEscrow(taskId: string, amount: number) {
  const [account] = await walletClient.getAddresses();
  
  return walletClient.writeContract({
    address: ESCROW_ADDRESS,
    abi: ESCROW_ABI,
    functionName: 'createTask',
    args: [taskId as `0x${string}`, formatToWei(amount)],
    account,
  });
}

// Function to complete a task
export async function completeTask(taskId: string) {
  const [account] = await walletClient.getAddresses();
  
  return walletClient.writeContract({
    address: ESCROW_ADDRESS,
    abi: ESCROW_ABI,
    functionName: 'completeTask',
    args: [taskId as `0x${string}`],
    account,
  });
} 