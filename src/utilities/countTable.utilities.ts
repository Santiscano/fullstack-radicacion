import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';

type SQLResposne = [OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[], FieldPacket[]]


// TRAER UNA FILA DE LA TABLA
export const getTableRow = async (table: string, attribute: string, value: string | number ) => {
    const [ data ]: SQLResposne = await connection.query(`SELECT * FROM ${ table } WHERE ${ attribute } = ?`, [ value ]);
    return data
};

// TRAER TODA LA INFORMACIÓN DE LA TABLA
export const getAllTable = async ( table: string ) => {
    const [ data ]: SQLResposne  = await connection.query(`SELECT * FROM ${ table };`);
    return data;
};

// CONTADOR DE INFORMACIÓN DE LA TALBLA
export const countTable = async( table: string, attribute: string, value: string | number) => {
    const [ validate ]: SQLResposne = await connection.query(`
        SELECT count(*) AS contador FROM ${ table } WHERE ${ attribute } = ?;`, [ value ]);
    //@ts-ignore
    return validate[0].contador;
};