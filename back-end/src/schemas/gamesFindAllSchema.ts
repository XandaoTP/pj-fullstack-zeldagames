import { z } from 'zod';

export const gameFindAllSchema = z.object({
    direction: z
    .string()
    .toLowerCase()
    .regex(/^(asc|desc)$/)
    .optional(),
    orderBy: z
    .string()
    .toLowerCase()
    .regex(/^(id|created_at)$/)
    .optional(),
})