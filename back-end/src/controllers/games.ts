import { Games } from "../types/games";
import  { promises } from 'fs'


export async function getGames() {
    try {
      const plataformPaths = (await promises.readdir("../games")).map(
        (path) => `../games/${path}`
      );
      const gamesPromises = plataformPaths.map((path) => promises.readFile(path));
      const gamesBuffers = await Promise.all(gamesPromises);
      const games = gamesBuffers
        .map((games) => JSON.parse(games.toString()))
        .map(({ ...games }) => games);
    
      return games;
    } catch (error) {
      console.error(`Error listing platform files: ${error}`);
      return 'erro';
    }
  }


export async function createGame(game: Partial<Games>) {
    const { id: lastestId } = await JSON.parse((
        await promises.readFile('../lastest-id.json')).toString()
        );
        console.log('numero',lastestId)
    game.id = lastestId + 1;
    await promises.writeFile('../lastest-id.json',
    JSON.stringify({
        id: game.id
    }))
    game.createdAt = new Date();
    await promises.writeFile(
      `../games/${game.id}.json`,
      JSON.stringify(game, undefined, 2)
    );
  
    return { success: true, game };
  }

  export async function getGame(id: number) {
    const gamesBuffer = await promises.readFile(`../games/${id}.json`);
    const games = JSON.parse(gamesBuffer.toString());
    return games;
  }

  export async function deleteGame(id: number) {
    let success = false;
    let game = null;
  
    try {
      const gameBuffer = await promises.readFile(`../games/${id}.json`);
      game = JSON.parse(gameBuffer.toString());
      await promises.unlink(`../games/${id}.json`);
      success = true;
    } catch (error) {
      console.log(error);
      success = false;
    }
    
    if (!success) {
        game = null;
     }

    return {
      success,
      game,
    };
  }

  export async function updateGame(id: number, nextGame: Partial<Games>) {
    const currentGameBuffer = await promises.readFile(`../games/${id}.json`);
    const currentGame = JSON.parse(currentGameBuffer.toString());
    const game = {
      ...currentGame,
      ...nextGame,
    };
  
    await promises.writeFile(
      `../games/${id}.json`,
      JSON.stringify(game, undefined, 2)
    );
  
    return { success: true, game };
  }