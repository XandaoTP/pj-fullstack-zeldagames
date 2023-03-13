import express from 'express';
import { createGame, deleteGame, getGame, getGames, updateGame } from '../controllers/games';

export const games = express.Router();


  games.get('/', async (req, res) => {
  const games = await getGames();
  res.status(200).json(games);
  console.log(games)
  
});


  games.get("/:id", async (req, res) => {
    const gameId = await getGame(Number(req.params.id))
    res.status(200).json(gameId)
  });

  games.post("/", async (req, res) => {
    const result = await createGame(req.body);
    res.status(201).json(result);
  });

  games.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const result = await deleteGame(id);
    res.json(result);
  });

  games.patch("/:id", async (req, res) => {
    const { success, game } = await updateGame(
      Number(req.params.id),
      req.body
    );
  
    res.status(200).json({
      success,
      data: game,
    });
  });

  games.put("/:id", (req, res) => {
    req.body.createdAt = new Date(req.body.createdAt);
    res.status(200).json({
      success: true,
      data: {
        id: Number(req.params.id),
        ...req.body,
      },
    });
  });