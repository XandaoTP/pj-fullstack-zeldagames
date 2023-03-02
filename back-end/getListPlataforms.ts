import { promises as fs } from "fs";


export async function getPlataforms() {
  try {
    const plataformPaths = (await fs.readdir("../plataforms")).map(
      (path) => `../plataforms/${path}`
    );
    console.log('kkkkkkkk',plataformPaths)
    const plataformPromises = plataformPaths.map((path) => fs.readFile(path));
    const plataformsBuffers = await Promise.all(plataformPromises);
    const plataforms = plataformsBuffers
      .map((plataform) => JSON.parse(plataform.toString()))
      .map(({ ...plataform }) => plataform);
  
    return plataforms;
  } catch (error) {
    console.error(`Error listing platform files: ${error}`);
    return 'erro';
  }
}