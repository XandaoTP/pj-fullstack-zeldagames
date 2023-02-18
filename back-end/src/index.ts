import express  from "express";

const app = express();

app.get('/', (req, res) => {

})

const port = 5000;

const host ='0.0.0.0';

app.listen(port, host, () => {
    console.log(`Funfando na porta: ${port}` )
})