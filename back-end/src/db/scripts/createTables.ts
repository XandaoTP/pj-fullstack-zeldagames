import mysql from 'mysql2/promise';
import { requireSQL } from '../requireSQL';
import { dbConfig } from '../connectionConfig';
import { dbPool } from '../dbPool';


async function creteTables () {
    const connection = await dbPool.getConnection();
    const [fields] = await connection.query("select * from games");
    console.log(fields)
    
    // const createTableMysql = await requireSQL('createTable.sql')

    // const connection = await mysql.createConnection(dbConfig)
    
    // const response = await connection.query(createTableMysql)
    // console.log(connection)
    // connection.destroy();
}

creteTables();