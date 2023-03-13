import express from 'express';
import * as getListPlataforms from "../controllers/plataforms";



export const plataformList = express.Router();


plataformList.get('/', async (req, res) => {
    const plataforms = await getListPlataforms.getPlataforms();
    res.status(200).json(plataforms);
});
