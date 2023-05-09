import 'dotenv/config'
import { connection } from '../config/database/db';
import moment from 'moment-timezone'
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 


// TRAER TODOS LOS TRACKINGS
export const getTrackingsModel = async(): Promise<{ data?: Data}> => {
    const [ allTracking ] = await connection.query(`
        SELECT T.idtracking,
            T.tracking_date, 
            T.tracking_observation, 
            FS.files_states, 
            FS.files_states_description, 
            U.idusers, 
            U.users_name, 
            U.users_lastname, 
            F.idfiles, 
            F.files_registered,
            R.roles
                FROM tracking T
                    LEFT JOIN files_states FS ON T.idfiles_states = FS.idfiles_states
                    LEFT JOIN users U ON T.idusers = U.idusers
                    LEFT JOIN files F ON T.idfiles = F.idfiles
                    LEFT JOIN roles R ON U.idroles = R.idroles;`);
    return { data: allTracking };
};

// TRAER UN TRACKING SEGÚN EL RADICADO
export const getTrackingRegisteredModel = async( data: string ): Promise<{ message?: string, data?: Data}> => {
    const [ tracking ] = await connection.query(`
        SELECT T.idtracking, 
            T.tracking_date, 
            T.tracking_observation, 
            FS.files_states, 
            FS.files_states_description, 
            U.idusers, 
            U.users_name, 
            U.users_lastname, 
            F.idfiles, 
            F.files_registered,
            F.files_account_type,
            F.files_account_type_number,
            R.roles
                FROM tracking T
                    LEFT JOIN files_states FS ON T.idfiles_states = FS.idfiles_states
                    LEFT JOIN users U ON T.idusers = U.idusers
                    LEFT JOIN files F ON T.idfiles = F.idfiles
                    LEFT JOIN roles R ON U.idroles = R.idroles
                        WHERE F.files_registered = ?;`, [ data ]);
    //@ts-ignore
    if (tracking[0] === undefined) return { message: `No se encuenta información adjunta al RADICADO: ${data}` };
    return { data: tracking };
};

// TRAER UN TRACKING SEGÚN LA CUENTA Y NUMERO DE COBRO
export const getTrackingAccountTypeModel = async ( type: string, number: number ): Promise<{message?:string, data?: Data}> => {
    const [ tracking ] = await connection.query(`
        SELECT 	T.idtracking, 
            T.tracking_date, 
            T.tracking_observation, 
            FS.files_states, 
            FS.files_states_description, 
            U.idusers, 
            U.users_name, 
            U.users_lastname, 
            F.idfiles, 
            F.files_registered,
            F.files_account_type,
            F.files_account_type_number,
            R.roles
                FROM tracking T
                    LEFT JOIN files_states FS ON T.idfiles_states = FS.idfiles_states
                    LEFT JOIN users U ON T.idusers = U.idusers
                    LEFT JOIN files F ON T.idfiles = F.idfiles
                    LEFT JOIN roles R ON U.idroles = R.idroles
                        WHERE F.files_account_type = ? AND F.files_account_type_number = ?;`, [ type, number ]);
    //@ts-ignore
    if (tracking[0] === undefined) return { message: `No se encuenta información adjunta a la ${type}: ${number}` };
    return { data: tracking };
}

// AGREGAR UN TRACKING
export const postTrakingModel = async ( idfiles_states: number, idfiles: number, idusers: number, tracking_observation: string ): Promise<void> => {
    const day = moment.tz(new Date(), "America/Bogota").format();
    await connection.query(`INSERT INTO tracking (idfiles_states, idfiles, idusers, tracking_observation, tracking_date)
        VALUES ( ?, ?, ?, ?, ? );`, [idfiles_states, idfiles, idusers, tracking_observation, day]);
    return console.log("ADDED_TRACKING");
};