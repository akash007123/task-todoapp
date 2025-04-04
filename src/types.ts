import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  completed: z.boolean(),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  createdAt: z.number()
});

export type Todo = z.infer<typeof TodoSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required')
});

export type User = z.infer<typeof UserSchema>;

export interface TodoFormData {
  title: string;
  description: string;
  assignedTo: string;
}