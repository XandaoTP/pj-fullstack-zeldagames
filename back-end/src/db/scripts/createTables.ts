import mysql from 'mysql2/promise';
import { requireSQL } from '../requireSQL';
require('dotenv').config()

console.log(process.env.DB_HOST);

async function creteTables () {
    const createTableMysql = await requireSQL('createTable.sql')

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      multipleStatements: true 
    })
    
    const response = await connection.query(createTableMysql)
    console.log(connection)
    connection.destroy();
}

creteTables();