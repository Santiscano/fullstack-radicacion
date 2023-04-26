import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Roles } from '../interfaces/roles.interface';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader


export const getFilesModel = async(): Promise<{data: Data}> => {
    const [ data ] = await connection.query('SELECT * FROM files;');
    return { data }
};