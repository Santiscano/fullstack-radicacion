import { connection } from '../../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';

type SQLResposne = [OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[], FieldPacket[]]


// TRAER UNA FILA DE LA TABLA
export const getOneRowTable = async (table: string, attribute: string, value: string | number ) => {
    const [ data ]: SQLResposne = await connection.query(`SELECT * FROM ${ table } WHERE ${ attribute } = ?`, [ value ]);
    return data;
};

// TRAER TODA LA INFORMACIÓN DE LA TABLA
export const getAllRowsTable = async ( table: string ) => {
    const [ data ]: SQLResposne  = await connection.query(`SELECT * FROM ${ table };`);
    return data;
};

