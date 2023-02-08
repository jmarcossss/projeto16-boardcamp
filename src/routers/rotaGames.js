import express from "express";
import { cadastroDePoll } from "../controllers/controlerPoll.js";
import { solicitacaoDePoll } from "../controllers/controlerPoll.js";
import { middlewarePoll } from "../middlewares/middlewarePoll.js";

const rotaGames = express.Router();
//Cadastro de um jogo
rotaGames.post("/games", middlewarePoll, cadastroDePoll);
//Lista dos jogos
rotaGames.get("/games", solicitacaoDePoll);

export default rotaGames; 