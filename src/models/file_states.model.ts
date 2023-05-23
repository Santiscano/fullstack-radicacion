import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader

export const getFileStatesModel = async (): Promise<{ data: Data }> => {
    const [ info ] = await connection.query('SELECT * FROM files_states;');
    return { data: info };
};