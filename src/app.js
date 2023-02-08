import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import rotas  from "./routers/rotas.js";
dotenv.config();

//Inicializando o server
const server = express();
server.use(cors());
server.use(express.json());

//Definindo o meu caminho de rotas 
server.use(rotas);

const PORTA = 5000;

server.listen(PORTA, () => {
    console.log("Servidor rodando na porta 5000...")
});