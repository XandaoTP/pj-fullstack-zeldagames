import express  from "express";
import cors from "cors";
import { gameList } from "./routes/routes";

const app = express();

app.get('/', (req, res) => {

})

const port = 5000;

const host ='0.0.0.0';

app.use(cors());
app.use(express.json());
app.use('/games', gameList)


app.listen(port, host, () => {
    console.log(`Funfando na porta: ${port}` )
})