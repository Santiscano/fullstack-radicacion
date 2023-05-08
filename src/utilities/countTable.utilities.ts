import { connection } from '../config/database/db';


export const countTable = async( table: string, attribute: string, value: string | number) => {
    const [validate]: any = await connection.query(`
        SELECT count(*) AS contador FROM ${ table } WHERE ${ attribute } = ?;`, [ value ]);
    const data = validate[0].contador 
    return validate[0].contador;
};