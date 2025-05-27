import { Router } from 'express';
import { body } from 'express-validator';
import { createTask, getTasks, getTaskById } from '../controllers/task.controller';

const router = Router();

// Validation middleware
const taskValidation = [
  body('title').notEmpty().trim().escape(),
  body('description').notEmpty().trim().escape(),
  body('reward').isFloat({ min: 0 }),
  body('creatorId').notEmpty(),
];

// Routes
router.post('/', taskValidation, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);

export const taskRoutes = router; 