import express from 'express';
import * as getListPlataforms from "../../getListPlataforms";



export const plataformList = express.Router();


plataformList.get('/', async (req, res) => {
    const plataforms = await getListPlataforms.getPlataforms();
    res.status(200).json(plataforms);
});
