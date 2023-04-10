import { connection } from '../config/database/db';
import * as dotenv from 'dotenv';

dotenv.config()

// Gererar radicados masivos
export const genRegistered = async (): ( Promise<string | object> ) => {
    try {
        const [ id ] = await connection.query('SELECT MAX(idfiles) AS id FROM files;');
        const date = new Date().toLocaleString().replace(", ", "T").replace(/\//g, "").replace(/\s+/g, "").replace(/\./g, "");
        // @ts-ignore
        const fileRegistered = `${id[0].id + 1}-${ date.toUpperCase() }`;
        return  fileRegistered 
    } catch (error) {
        console.log(error);
        return {error: true, message: "Error del servidor para generar los radicados"};
    };
};