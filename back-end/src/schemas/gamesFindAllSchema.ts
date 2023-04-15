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
    limit: z.
    string().transform(value => Number(value)).refine(value => Number.isInteger(value) && value >= 0 && value <= 5).optional(),
    offset: z.
    string().transform(value => Number(value)).refine(value => Number.isInteger(value) && value >= 0).optional(),
    search: z.string().max(64).regex(/[a-z0-9]/).optional()
})