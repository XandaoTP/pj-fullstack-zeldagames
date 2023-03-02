import express from 'express';
import * as getListPlataforms from "../../getListPlataforms";



export const plataformList = express.Router();


plataformList.get('/', async (req, res) => {
    console.log('1',(req as any).requestDate);
    const plataforms = await getListPlataforms.getPlataforms();
    res.status(200).json(plataforms);
    console.log('oi')
});
