import { connection } from '../../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';

type SQLResposne = [OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[], FieldPacket[]]

// CONTADOR DE INFORMACIÓN DE LA TALBLA
export const countTable = async( table: string, attribute: string, value: string | number): Promise<number> => {
    const [ validate ]: SQLResposne = await connection.query(`
        SELECT count(*) AS contador FROM ${ table } WHERE ${ attribute } = ?;`, [ value ]);
    //@ts-ignore
    return validate[0].contador;
};