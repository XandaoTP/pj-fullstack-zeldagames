import { plataformList } from './routes/plataform';
import express  from "express";
import cors from "cors";
import { games } from "./routes/games";

const app = express();


const port = 5000;

const host ='0.0.0.0';

app.use(express.json());
app.use(cors());

app.use('/games', games)
app.use('/plataform', plataformList)

app.listen(port, host, () => {
    console.log(`Funfando na porta: ${port}` )
})