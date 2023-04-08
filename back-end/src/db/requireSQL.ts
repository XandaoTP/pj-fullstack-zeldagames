import { promises } from "fs";
import path from "path";

export async function requireSQL(sqlPath: string) {
    const sqlFile = await promises.readFile(path.join('src/db/sql', sqlPath));
    return sqlFile.toLocaleString();
}