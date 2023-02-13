//Importação de bibliotecas padrão
import { Router } from "express";
import { listRentals } from "../controllers/controllerRentals.js";
import { insertRental } from "../controllers/controllerRentals.js";
import { finishRental } from "../controllers/controllerRentals.js";
import { deleteRental } from "../controllers/controllerRentals.js";
import { padraoMiddleware } from "../middlewares/padraoMiddleware.js";
import { padraoSchemaRentals2 } from "../schemas/padraoSchemas.js";

const rotaRentals = Router();

//Lista dos rental para ser exibida
rotaRentals.get("/rentals", listRentals);
//Cadastro de um rental
rotaRentals.post("/rentals", padraoMiddleware(padraoSchemaRentals2), insertRental);
//Cadastro de um rental por id
rotaRentals.post("/rentals/:id/return", finishRental);
//Deletar um rental
rotaRentals.delete("/rentals/:id", deleteRental);

//Cadastro de um jogo
//Lista dos games para ser exibida

export default rotaRentals;