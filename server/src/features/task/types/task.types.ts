import { z } from 'zod';

export const UtaskSchema = z.object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
    // Add your schema properties here
});

export type Utask = z.infer<typeof UtaskSchema>;
export type CreateUtaskDto = Omit<Utask, 'id' | 'createdAt' | 'updatedAt'>;

