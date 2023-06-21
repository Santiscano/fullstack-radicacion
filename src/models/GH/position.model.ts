import { connection } from '../../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

// CREAR UNA POSICIÓN
export const postPositionModel = async ( data: string): Promise<void> => {
    await connection.query(`INSERT INTO position (position_name)
    VALUES ( ? );`, [ data ]);
};