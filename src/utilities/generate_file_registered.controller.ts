import { connection } from '../config/database/db';
import moment from 'moment-timezone'
import 'dotenv/config';


// Gererar radicados masivos
export const genRegistered = async (): ( Promise<string> ) => {
    const [ id ] = await connection.query('SELECT MAX(idfiles) AS id FROM files;');
    const info = moment.tz(new Date(), "America/Bogota").format();
    const date = info.replace(/-/g, "").replace("05:00", "");
    // @ts-ignore
    const fileRegistered = `${id[0].id + 1}-${ date.toUpperCase() }`;
    return  fileRegistered 
};