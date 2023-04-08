import mysql from 'mysql2/promise';
import { requireSQL } from '../requireSQL';

async function creteTables () {
    const createTableMysql = await requireSQL('createTable.sql')

    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 6000,
      user: 'root',
      password: 'password',
      database: 'zeldagames',
      multipleStatements: true 
    })
    
    const response = await connection.query(createTableMysql)
    console.log(connection)
    connection.destroy();
}

creteTables();