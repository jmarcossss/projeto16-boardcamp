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
  catch(err) { response.sendStatus(500); }
}

//Função que insere todos os rentals
export async function insertRental(require, response) {
  const { customerId, gameId, daysRented } = require.body;
  try {
    const jueGO = await db.query('select * from games where id = $1', [gameId,]);
    //Se aquele jogo já existir, retornar status 400
    if(jueGO.rowCount !== 1) {
      return response.sendStatus(400);
    }
    //Se aquele customer já existir, retornar status 400
    const custGO = await db.query('select * from customers where id = $1', [customerId]);
    if(custGO.rowCount !== 1) {
      return response.sendStatus(400);
    }
    //Consulta de rentals por id
    const rentGO = await db.query('select * from rentals where "gameId" = $1',[gameId]);
    //Consulta de stackTotal
    const checkStock = await db.query('select "stockTotal" from games where id = $1', [gameId]);
    //Se a contagem for menor ou igual, retornar status 400
    if(checkStock.rows[0].stockTotal <= rentGO.rowCount) {
      return response.sendStatus(400);
    }
    const rental = await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") VALUES ($1, $2, $3, NOW(), (select "pricePerDay" from games where id = $2) * $3);`, [customerId, gameId, daysRented]);
    //Se o rental bater, ele é criado e retorna status 201
    if(rental.rowCount === 1) {
      response.sendStatus(201);
    }
  }
  //Caso contrário, retorna status 500
  catch(err) { console.log(err); response.sendStatus(500); }
}

//Função que finaliza todos os rentals
export async function finishRental(require, response) {
  const hhGO = Number(require.params.id);
  //Verificação para ver se o número é menor que 1 ou não é inteiro, logo retornar status 400
  if(!hhGO || hhGO < 1 || !Number.isSafeInteger(hhGO)) {
    return response.sendStatus(400);
  }
  try {
    let vitT = 0;
    const rentGO2 = await db.query('select * from rentals where id = $1', [hhGO,]);
    if(rentGO2.rowCount !== 1) { return response.sendStatus(404); }
    const rentalIsFinished = await db.query('select * from rentals where id = $1 AND "returnDate" IS NOT NULL', [hhGO]);
    if(rentalIsFinished.rowCount !== 0) { return response.sendStatus(400); }
    //Variáveis que são usadas com funções matemáticas para controlar o tempo de forma correta (tipo Flash :))
    const rental = rentGO2.rows[0];
    const minute = new Date().getTime() - new Date(rental.rentDate).getTime();
    const seconds = Math.floor(minute / 86400000);
    //Se seconds for maior, então calcula
    if(seconds > rental.daysRented) {
      const addicionalDays = seconds - rental.daysRented;
      vitT = addicionalDays * (rental.originalPrice / rental.daysRented);
    }
    //Se conseguir fazer o update, então retornar status 200
    await db.query('update rentals set "returnDate" = NOW(), "vitT" = $1 where id=$2', [vitT, hhGO]);
    response.sendStatus(200);
  }
  //Se der ruim, retornar status 500
  catch(error) { console.log(error); response.sendStatus(500); }
}

//Função que deleta os rentals
export async function deleteRental(require, response) {
  //A ideia é a mesma para as duas funções, fazer comparações e depois consultar o que é solicitado
  const hhGO = Number(require.params.id);
  //Verificação para ver se o número é menor que 1 ou não é inteiro, logo retornar status 400
  if(!hhGO || hhGO < 1 || !Number.isSafeInteger(hhGO)) { return response.sendStatus(400); }
  try {
    const rentGO3 = await db.query('select * from rentals where id = $1', [hhGO,]);
    if(rentGO3.rowCount !== 1) { return response.sendStatus(404); }
    const rentalIsFinished = await db.query('select * from rentals where id = $1 AND "returnDate" IS NOT NULL', [hhGO]);
    if(rentalIsFinished.rowCount !== 1) { return response.sendStatus(400); }
    const deleteRental = await db.query('delete from rentals where id = $1', [hhGO,]);
    if(deleteRental.rowCount === 1) { return response.sendStatus(200); }
  }
  //Se der ruim, status 500
  catch(error) { console.log(error); response.sendStatus(500); }
}