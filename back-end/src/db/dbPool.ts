import mysql from 'mysql2/promise';
import { dbConfig } from './connectionConfig';

export const dbPool = mysql.createPool({
    ...dbConfig,
    connectionLimit: 10
})