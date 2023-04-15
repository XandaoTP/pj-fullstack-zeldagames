import { number } from "zod";
import { dbPool } from "../db/dbPool";

export type Games = {
    id: number;
    title: string;
    picture: string;
    subtitle: string;
    content: string;
    created_at: Date;
};


export async function findOneById(id: number) : Promise<Games> {
    const connection = await dbPool.getConnection();
    const [[games]] = await connection.query('select * from games where id=?', [id]) as any;
    connection.release()
    
    return games;
}
export async function findAll({
    direction = 'desc',
    orderBy = 'created_at',
    limit = 5,
    offset = 0,
    search,
} : {
    direction?: string,
    orderBy?: string,
    limit?: number,
    offset?:  number,
    search?: string
} = {}) : Promise<{
    games: Games[],
    count: number
}> {
    const connection = await dbPool.getConnection();
    const [games] = await connection.query(`select * from games ${search ? `where content like '%${search}%' or title like '%${search}%' or subtitle like '%${search}%'`: ''} order by ${orderBy} ${direction} limit ${limit} offset ${offset}`) as any;
    const [[{count}]] = await connection.query(
        "select count(*) as count from games"
    ) as any;
    connection.release()
    return { count, games };

    

}
export async function create({title, content, subtitle, picture}: Games) {
    const connection = await dbPool.getConnection();
    const response = (await connection.query('insert into games (title, content, subtitle, picture) values (?,?,?,?)', [title, content, subtitle, picture])) as any;

    const success = response.affectRows >0
    const id = response.insertID;

    const game = await findOneById(id)
    connection.release()
    
    return {game, success}

}
export async function createMany(games : Games[]) {
    const gamesQuerys = games.map(() => 'insert into games (title, content, subtitle, picture) values (?,?,?,?);').join('')
    const gamesArgs = games.map(({title, content, subtitle, picture}) => ([title, content, subtitle, picture])).flat();
    const connection = await dbPool.getConnection();
    const response = (await connection.query(gamesQuerys, gamesArgs)) as any;
    console.log(response)

    const success = response.length > 0
   
    return {success}


}
export async function update(id : number, {title, content, subtitle, picture}: Partial<Games>) {
    const connection = await dbPool.getConnection();
    const response = (await connection.query('update games set title=?, content=?, subtitle=?, picture=? where id=?', [title, content, subtitle, picture, id])) as any;

    const success = response.affectRows > 0

    const game = await findOneById(id)
    return {game, success}

}
export async function destroy(id: number) {
    const game = await findOneById(id);
    const connection = await dbPool.getConnection();
    const [response] = (await connection.query("delete from games where id=?", [id])) as any;
    const success = response.affectRows >0
    return {success, game}
}

