//Importação de bibliotecas padrão
import { Router } from "express";
import { solicitacaoDeRentals } from "../controllers/controllerRentals.js";
import { cadastroDeRentals } from "../controllers/controllerRentals.js";
import { finalizacaoDeRentals } from "../controllers/controllerRentals.js";
import { deletacaoDeRentals } from "../controllers/controllerRentals.js";
import { padraoMiddleware } from "../middlewares/padraoMiddleware.js";
import { padraoSchemaRentals2 } from "../schemas/padraoSchemas.js";

const rotaRentals = Router();

//Lista dos rental para ser exibida
rotaRentals.get("/rentals", solicitacaoDeRentals);
//Cadastro de um rental
rotaRentals.post("/rentals", padraoMiddleware(padraoSchemaRentals2), cadastroDeRentals);
//Cadastro de um rental por id
rotaRentals.post("/rentals/:id/return", finalizacaoDeRentals);
//Deletar um rental
rotaRentals.delete("/rentals/:id", deletacaoDeRentals);

//Cadastro de um jogo
//Lista dos games para ser exibida

export default rotaRentals;