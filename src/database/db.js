import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

//Configuração padrão para se conectar com o postgres no SQL
const { Pool } = pg;
const configDatabase = { connectionString: process.env.DATABASE_URL, };

if(process.env.MODE === "prod") configDatabase.ssl = true;
export const db = new Pool(configDatabase);