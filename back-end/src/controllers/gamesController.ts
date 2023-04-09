import express from 'express';
import { updateGame } from './games';
import * as gamesRepository from '../repositories/gamesRepository'
import { gameFindAllSchema } from '../schemas/gamesFindAllSchema';

export const gamesController = express.Router();


  gamesController.get('/', async (req, res) => {
    const params = await gameFindAllSchema.safeParseAsync(req.query)
    if(params.success) {
      const dbGames = await gamesRepository.findAll(params.data);
      res.status(200).json(dbGames);
     
    }else{
      res.status(200).json([])
    }
    
});


  gamesController.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const dbGames = await gamesRepository.findOneById(id);
     res.status(200).json(dbGames)
  });

  gamesController.post("/", async (req, res) => {
    const { success, game } = await gamesRepository.create(req.body);
    res.status(200).json({
      success,
      data: game,
    });
  });
  gamesController.post("/createmany", async (req, res) => {
    const { success } = await gamesRepository.createMany(req.body);
    res.status(200).json({
      success,
    });
  });

  gamesController.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const dbresult = await gamesRepository.destroy(id);
    res.status(200).json(dbresult);
  });

  gamesController.patch("/:id", async (req, res) => {
    const { success, game } = await updateGame(
      Number(req.params.id),
      req.body
    );
  
    res.status(200).json({
      success,
      data: game,
    });
  });

  gamesController.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const {success, game } = await gamesRepository.update(id, req.body)
    res.status(200).json({
      success: true,
      data: {
        success,
        data: game
      },
    });
  });