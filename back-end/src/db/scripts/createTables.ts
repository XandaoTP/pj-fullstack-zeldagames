import mysql from 'mysql2/promise';
import { requireSQL } from '../requireSQL';

async function creteTables () {
    const createTableMysql = await requireSQL('createTable.sql')
    console.log(createTableMysql)
}

creteTables();