import express from 'express';
import { Games } from '../entities/games';

export const gameList = express.Router();

const exampleGame: Games = {
    title: "The legend of Zelda Breath of the Wild",
    description: "Exemplo de descrição",
    picture: "https://1.bp.blogspot.com/-dWeC85Kg0Mg/WLgNmgUtM1I/AAAAAAAAVcE/kzy3_0QzVRUVAjEc8YWUKxLNrPS83CX7ACLcB/s640/zelda-breath-wild-capa.png",
    createdAt: new Date(),
    content: `
    Jogo mais recente da franquia, lançado para nintendo switch e nintendo wiiU
  `,
};

const exampleGameList: Games[] = new Array(5).fill(exampleGame);

const exampleGamesAppear = exampleGameList.reduce(
    (stack, item, index) => {
      stack[index.toString()] = { id: index, ...item };
      return stack;
    },
    {} as { [key: string]: Games }
  );
  

  gameList.get("/", (req, res) => {
    res.status(200).json(Object.values(exampleGamesAppear));
  });