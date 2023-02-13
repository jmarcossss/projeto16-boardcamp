import { db } from '../database/db.js';

//Função para cadastrar jogos
export async function cadastroDeGames(require, response) {
  const { name, image, stockTotal, pricePerDay } = require.body;
  try {
    //Os valores a serem consultados são representados pelas variáveis $1
    const contador = await db.query('select * from games where name = $1', [name,]);
    //Se existir um usuário desse já cadastrado, dará status 409
    if(contador.rowCount > 0) {
      return response.sendStatus(409);
    }
    //Os valores a serem inseridos são representados pelas variáveis $1, $2, $3 e $4.
    const soma = await db.query('insert into games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)', [name, image, stockTotal, pricePerDay]);
    //Se a somatória for 0, é porque não existe aquele usuário
    //Logo, dá para cadastrá-lo
    if(soma.rowCount === 0) {
      return response.sendStatus(400);
    }
    response.sendStatus(201);
  }
  //Deu ruim, status 500
  catch(error) {
    response.sendStatus(500);
  }
}

//Função para ver os jogos existentes
export async function solicitacaoDeGames(_require, response) {
  try {
    const soma = await db.query('select * from games');
    response.send(soma.rows);
  }
  //Deu ruim, status 500
  catch(error) {
    response.sendStatus(500);
  }
}
