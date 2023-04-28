import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Sedes } from '../interfaces/sedes.interface';


type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 

// TRAER CEDI
export const getSedesModel = async(): Promise<{data: Data}> => {
    const [ sedes ] = await connection.query('SELECT * FROM sedes;');
    return { data: sedes };
};

// CREAR CEDI
export const postSedeModel = async(data: Sedes): Promise<{message: string, data?:Data}> =>{
    const [ validate ] = await connection.query(`
        SELECT count(*) AS contador FROM sedes WHERE sedes_city = ? AND sedes_address = ?;`,
        [data.sedes_city, data.sedes_address]);
    //@ts-ignore
    if ( validate[0].contador !== 0){
        return { message: `La Sede en la ciudad: ${ data.sedes_city.toUpperCase() } y con dirección: ${ data.sedes_address.toUpperCase() }, ya se encuentra registrada`};
    };
    await connection.query(`
        INSERT INTO sedes (sedes_country, sedes_state, sedes_city, sedes_address, sedes_name, sedes_type)
            VALUES ( ?, ?, ?, ?, ?, ?);
        `, [ 
            data.sedes_country.toUpperCase(), 
            data.sedes_state.toUpperCase(), 
            data.sedes_city.toUpperCase(), 
            data.sedes_address.toUpperCase(), 
            data.sedes_name.toUpperCase(), 
            data.sedes_type.toUpperCase()
        ]);
    const [ sedes ] = await connection.query(`
            SELECT * FROM sedes WHERE sedes_address = ? AND sedes_city = ?;`, 
        [ data.sedes_address.toUpperCase(), data.sedes_city.toUpperCase() ]);
    return { message: `CEDI: ${data.sedes_name.toUpperCase()} en la ciudad de ${data.sedes_city.toUpperCase()} creada con éxito`, data: sedes };
};