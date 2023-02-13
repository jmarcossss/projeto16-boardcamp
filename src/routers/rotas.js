import { Router } from "express";
import rotaGames from "./rotaGames.js";
import rotaCustomers from "./rotaCustomers.js";
import rentals from "./rotaRentals.js";

const router = Router();

//Criação dos jogos
router.use(rotaGames);
//Criação dos customers
router.use(rotaCustomers);
//Criação das rentals
router.use(rentals);

export default router;