import { Router } from 'express';
import { cadastroDeGames } from '../controllers/controllerGames.js';
import { solicitacaoDeGames } from '../controllers/controllerGames.js';
import { padraoMiddleware } from '../middlewares/padraoMiddleware.js';
import { gameSchema } from '../schemas/padraoSchemas.js';

const rotaGames = Router();

//Cadastro de um jogo
rotaGames.post('/games', padraoMiddleware(gameSchema), cadastroDeGames);
//Lista dos games para ser exibida
rotaGames.get('/games', solicitacaoDeGames);

export default rotaGames;