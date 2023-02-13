import { db } from '../database/db.js';

//Função para cadastrar um novo customer
export async function cadastroDeCustomers(require, response) {
  const { name, phone, cpf, birthday } = require.body;
  try {
    const contador = await db.query(
      'select * from customers where cpf = $1',
      [cpf]
    );
    if(contador.rowCount > 0) {
      return response.sendStatus(409);
    }
    const soma = await db.query(
      'insert into customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
      [name, phone, cpf, birthday]
    );
    if(soma.rowCount === 0) {
      return response.sendStatus(400);
    }
    response.sendStatus(201);
  }
  catch(error) {
    response.sendStatus(500);
  }
}

//Função para exibir os customers existentes
export async function solicitacaoDeCustomers(_req, response) {
  try {
    const soma = await db.query('select * from customers');
    response.send(soma.rows);
  }
  catch(error) {
    response.sendStatus(500);
  }
}

//Função para exibir os customers existentes
export async function solicitacaoDeCustomers2(require, response) {
  const customer = Number(require.params.id);
  if(!customer || customer < 1 || !Number.isSafeInteger(customer)) {
    return response.sendStatus(400);
  }
  try {
    const soma = await db.query('select * from customers where id = $1', [
      customer,
    ]);
    if(soma.rowCount === 0) {
      return response.sendStatus(404);
    }
    response.send(soma.rows[0]);
  }
  catch(error) {
    response.sendStatus(500);
  }
}

//Função para atualizar um customer existente
export async function atualizaCustomers(require, response) {
  const valueC = Number(require.params.id);
  if(!valueC || valueC < 1 || !Number.isSafeInteger(valueC)) {
    return response.sendStatus(400);
  }
  try {
    const soma = await db.query('select * from customers where id = $1', [
      valueC,
    ]);
    //Se a soma for igua a 0, é porque não existe aquele customer
    if(soma.rowCount === 0) {
      return response.sendStatus(404);
    }
    const { name, phone, cpf, birthday } = require.body;
    const valueE = await db.query(
      'select * from customers where cpf = $1 AND id <> $2',
      [cpf, valueC]
    );
    //Se já existir aquele CPF, então deu ruim, exibir sattus 409
    if(valueE.rowCount > 0) {
      return response.sendStatus(409);
    }
    const updateCustomer = await db.query(
      'UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 where id = $5',
      [name, phone, cpf, birthday, valueC]
    );
    //Se não existir, dá status 400
    if(updateCustomer.rowCount === 0) {
      return response.sendStatus(400);
    }
    //Status 200, deu bom, foi criado com sucesso
    response.sendStatus(200);
  }
  //Deu ruim, status 500
  catch(error) {
    response.sendStatus(500);
  }
}
