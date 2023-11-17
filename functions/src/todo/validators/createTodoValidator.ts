import { z } from 'zod';

export const createTodoValidator = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  done: z.boolean().default(false).optional(),
});
