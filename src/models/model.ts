import 'dotenv/config'
import { connection } from '../config/database/db';

export const modelFucker = async (api_key: string, Usuario: number, Casa: string) => {
    const [ pathFiles ] = await connection.query(`SELECT count(*) AS contador FROM tracking WHERE idfiles = ?;`, [Usuario]);
    return pathFiles;
}