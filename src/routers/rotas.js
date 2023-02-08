import express from "express"
import rotaGames from "./rotaGames.js";
// import rotaCustomers from "./rotaCustomers.js";
// import rotaRentals from "./rotaRentals.js";

const rotas = express.Router();

//Rota dos jogos
rotas.use(rotaGames);
// //Rota dos clientes
// rotas.use(rotaCustomers);
// //Rota dos alugueis
// rotas.use(rotaRentals);

export default rotas; 