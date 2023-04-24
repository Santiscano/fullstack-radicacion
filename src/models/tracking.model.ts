import 'dotenv/config'
import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 


// TRAER TODOS LOS TRACKINGS
export const getTrackingsModel = async(): Promise<{ data?: Data}> => {
    const [ allTracking ] = await connection.query(`
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
            R.roles
		    	FROM tracking T
		    		LEFT JOIN files_states FS ON T.idfiles_states = FS.idfiles_states
		    		LEFT JOIN users U ON T.idusers = U.idusers
		    		LEFT JOIN files F ON T.idfiles = F.idfiles
                    LEFT JOIN roles R ON U.idroles = R.idroles;`);
        return { data: allTracking };
};

// TREAER UN TRACKING
export const getTrackingModel = async( data: number ): Promise<{ message: string, data?: Data}> => {
    const [ validate ] = await connection.query(`SELECT count(*) as contador FROM tracking WHERE idfiles = ?;`, [ data ])
        //@ts-ignore
        if (validate[0].contador === 0) {
            return { message: `el idfile: ${ data }, no se encuentra registrado en la base de datos`};
        };
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
                R.roles
		        	FROM tracking T
		        		LEFT JOIN files_states FS ON T.idfiles_states = FS.idfiles_states
		        		LEFT JOIN users U ON T.idusers = U.idusers
		        		LEFT JOIN files F ON T.idfiles = F.idfiles
                        LEFT JOIN roles R ON U.idroles = R.idroles
		        			WHERE F.idfiles = ?;`, [ data ]);
        return { message: "SUCCESS", data: tracking };
};

// AGREGAR UN TRACKING
export const postTrakingModel = async ( idfiles_states: number, idfiles: number, idusers: number, tracking_observation: string ): Promise<void> => {
    await connection.query(`INSERT INTO tracking (idfiles_states, idfiles, idusers, tracking_observation, tracking_date)
        VALUES ( ?, ?, ?, ?, ? );`, [idfiles_states, idfiles, idusers, tracking_observation, new Date()]);
    return console.log("ADDED_TRACKING");
};