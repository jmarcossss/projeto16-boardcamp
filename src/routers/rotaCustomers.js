//Importação de bibliotecas padrão
import { Router } from "express";
import { cadastroDeCustomers } from "../controllers/controllerCustomers.js";
import { solicitacaoDeCustomers } from "../controllers/controllerCustomers.js";
import { solicitacaoDeCustomers2 } from "../controllers/controllerCustomers.js";
import { atualizaCustomers } from "../controllers/controllerCustomers.js";
import { padraoMiddleware } from "../middlewares/padraoMiddleware.js";
import { padraoSchemaCustomers } from "../schemas/padraoSchemas.js";

const rotaCustomers = Router();

//Cadastro de um cadastro
rotaCustomers.post("/customers", padraoMiddleware(padraoSchemaCustomers), cadastroDeCustomers);
//Lista dos customers para ser exibida
rotaCustomers.get("/customers", solicitacaoDeCustomers);
//Lista dos customers para ser exibida por id
rotaCustomers.get("/customers/:id", solicitacaoDeCustomers2);
//Atualizar lista dos customers
rotaCustomers.put("/customers/:id", padraoMiddleware(padraoSchemaCustomers), atualizaCustomers);

//Cadastro de um jogo
//Lista dos games para ser exibida

export default rotaCustomers;
