import { connection } from '../../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';
import { countTable } from './countTable.utilities';

type SQLResposne = [OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[], FieldPacket[]]


// ELIMINAR UNA FILA DE LA TABLA
export const deleteRowTable = async (table: string, attribute: string, value: string | number ) => {
    if( await countTable(table, attribute, value) === 0 ) return { message: `${attribute.toUpperCase()}: ${value}, NO SE ENCUENTRA EN LA TABLA ${table.toUpperCase()}` };
    await connection.query(`DELETE FROM ${ table } WHERE ${ attribute } = ?`, [ value ]);
    return { message: `${attribute.toUpperCase()}: ${value}, ELIMINADO CON ÉXITO DE LA TABLA: ${table.toUpperCase()}` };
};


