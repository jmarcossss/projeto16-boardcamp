import { db } from '../database/db.js';


//Função que lista com todos os aluguéis
export async function listRentals(_req, response) {
  try {
    const rentals = await db.query(`
    select rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object('id', games.id, 'name', games.name) AS game
    from rentals
    join customers on rentals."customerId" = customers.id join games on rentals."gameId" = games.id;
    `);
    response.send(rentals.rows);
  }
  //Deu ruim, status 500
  catch(err) {
    response.sendStatus(500);
  }
}


//Função que insere todos os rentals
export async function insertRental(require, response) {
  const { customerId, gameId, daysRented } = require.body;
  try {
    const jueGO = await db.query('select * from games WHERE id = $1', [gameId,]);
    //Se aquele jogo já existir, retornar status 400
    if(jueGO.rowCount !== 1) {
      return response.sendStatus(400);
    }
    //Se aquele customer já existir, retornar status 400
    const custGO = await db.query('select * from customers WHERE id = $1', [customerId]);
    if(custGO.rowCount !== 1) {
      return response.sendStatus(400);
    }
    //Consulta de rentals por id
    const rentGO = await db.query('select * from rentals WHERE "gameId" = $1',[gameId]);
    //Consulta de stackTotal
    const checkStock = await db.query('select "stockTotal" from games WHERE id = $1', [gameId]);
    //Se a contagem for menor ou igual, retornar status 400
    if(checkStock.rows[0].stockTotal <= rentGO.rowCount) {
      return response.sendStatus(400);
    }
    const rental = await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") VALUES ($1, $2, $3, NOW(), (select "pricePerDay" from games WHERE id = $2) * $3);`, [customerId, gameId, daysRented]);
    //Se o rental bater, ele é criado e retorna status 201
    if(rental.rowCount === 1) {
      response.sendStatus(201);
    }
  }
  //Caso contrário, retorna status 500
  catch(err) {
    console.log(err);
    response.sendStatus(500);
  }
}