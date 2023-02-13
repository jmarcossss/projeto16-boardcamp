import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routers/rotas.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(json());

server.use(routers);

const PORTA = 5000;
server.listen(PORTA, () => {
    console.log("Servidor rodando na porta 5000...")
});
