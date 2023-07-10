import { connection } from "../../config/database/db";
import {
    RowDataPacket,
    OkPacket,
    ResultSetHeader,
    FieldPacket,
} from "mysql2/promise";

type SQLResposne = [
    OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[],
    FieldPacket[]
];

// TRAER UNA FILA DE LA TABLA
export const getOneRowTable = async ( table: string, attribute: string, value: string | number ): Promise<{ message: string; data?: SQLResposne }> => {
    const [data]: SQLResposne = await connection.query( `SELECT * FROM ${table} WHERE ${attribute} = ?`, value );
    // @ts-ignore
    if (data.length === 0) {
        return { message: `Datos con id: ${value}, no se encuentran en la base de datos` };
    }
    // @ts-ignore
    return { message: "Datos encontrados con exito", data };
};

// TRAER TODA LA INFORMACIÓN DE LA TABLA
export const getAllRowsTable = async (table: string) => {
  const [data]: SQLResposne = await connection.query(`SELECT * FROM ${table};`);
  return data;
};
