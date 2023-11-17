import { z } from 'zod';

export const updateTodoValidator = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  done: z.boolean().optional(),
});
