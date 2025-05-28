import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Task operations
export async function createTask(data: {
  title: string;
  description: string;
  reward: number;
  creatorId: string;
}) {
  return prisma.task.create({
    data: {
      ...data,
      status: 'OPEN',
    },
  });
}

export async function getTasks() {
  return prisma.task.findMany({
    include: {
      creator: true,
      submitter: true,
      escrow: true,
    },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
    include: {
      creator: true,
      submitter: true,
      escrow: true,
    },
  });
}

// User operations
export async function createUser(walletAddress: string) {
  return prisma.user.create({
    data: {
      walletAddress,
    },
  });
}

export async function getUserByWallet(walletAddress: string) {
  return prisma.user.findUnique({
    where: { walletAddress },
  });
}

// Escrow operations
export async function createEscrow(data: {
  taskId: string;
  amount: number;
}) {
  return prisma.escrow.create({
    data: {
      ...data,
      status: 'PENDING',
    },
  });
}

export async function updateEscrowStatus(id: string, status: 'RELEASED' | 'REFUNDED' | 'DISPUTED') {
  return prisma.escrow.update({
    where: { id },
    data: { status },
  });
} 