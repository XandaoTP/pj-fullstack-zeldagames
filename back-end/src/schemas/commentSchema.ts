import { z } from 'zod';
import * as gamesRepository from '../repositories/gamesRepository'

export type comment = z.infer<typeof commentSchema>

export const commentSchema = z.object({
    gameId: z.number()
    .refine(gameId => Number.isInteger(gameId))
    .refine(async gameId => {
        const gameExists = await gamesRepository.existsById(gameId);
        return gameExists;
    },
    {
        message: 'Esse id de jogo não existe',
        params: ['gameId'],
    }
    ),
    content: z.string().min(1).max(150)
})