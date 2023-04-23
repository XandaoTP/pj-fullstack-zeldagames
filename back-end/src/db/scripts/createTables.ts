import { dbPool } from '../dbPool';


async function creteTables () {
    const connection = await dbPool.getConnection();
    const [fields] = await connection.query("select * from games");
    console.log(fields)
    
}

creteTables();