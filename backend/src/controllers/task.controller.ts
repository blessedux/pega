import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createTaskInEscrow } from '../services/web3.service';

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, reward, creatorId } = req.body;

    // Create task in database
    const task = await prisma.task.create({
      data: {
        title,
        description,
        reward,
        creatorId,
        status: 'OPEN',
      },
      include: {
        creator: true,
      },
    });

    // Create escrow in smart contract
    await createTaskInEscrow(task.id, reward);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        creator: true,
        submitter: true,
        escrow: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        creator: true,
        submitter: true,
        escrow: true,
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
} 