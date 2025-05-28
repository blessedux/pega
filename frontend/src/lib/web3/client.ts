"use client";

import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { polygonMumbai } from 'viem/chains';

// Initialize public client for reading blockchain data
export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

// Initialize wallet client for transactions
export const getWalletClient = () => {
  if (typeof window === 'undefined') return null;
  
  return createWalletClient({
    chain: polygonMumbai,
    transport: custom((window as any).ethereum),
  });
};

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

// Contract addresses (to be replaced with actual addresses)
const CHILE_TOKEN_ADDRESS = '0x...' as `0x${string}`; // Replace with actual token address
const ESCROW_ADDRESS = '0x...' as `0x${string}`; // Replace with actual escrow contract address

// Helper function to format amount to wei
export function formatToWei(amount: number): bigint {
  return BigInt(amount * 1e18);
}

// Helper function to format wei to amount
export function formatFromWei(wei: bigint): number {
  return Number(wei) / 1e18;
}

// Function to approve token spending
export async function approveTokenSpending(spender: `0x${string}`, amount: number) {
  const walletClient = getWalletClient();
  if (!walletClient) throw new Error('Wallet client not available');
  
  const [account] = await walletClient.getAddresses();
  
  return walletClient.writeContract({
    address: CHILE_TOKEN_ADDRESS,
    abi: CHILE_TOKEN_ABI,
    functionName: 'approve',
    args: [spender, formatToWei(amount)],
    account,
  });
}

// Function to create a task in the escrow contract
export async function createTaskInEscrow(taskId: string, amount: number) {
  const walletClient = getWalletClient();
  if (!walletClient) throw new Error('Wallet client not available');
  
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
  const walletClient = getWalletClient();
  if (!walletClient) throw new Error('Wallet client not available');
  
  const [account] = await walletClient.getAddresses();
  
  return walletClient.writeContract({
    address: ESCROW_ADDRESS,
    abi: ESCROW_ABI,
    functionName: 'completeTask',
    args: [taskId as `0x${string}`],
    account,
  });
} 