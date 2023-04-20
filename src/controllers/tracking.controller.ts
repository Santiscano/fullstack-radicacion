import "dotenv/config";
import { Request, Response } from 'express';
import { missingData } from "../utilities/missingData.utilities";
import { connection } from '../config/database/db';

export const getTrackings = async (req: Request, res: Response) => {
    const { api_key } = req.body;
    try {
        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({error: true, message: "No cuentas con los permisos para acceder a esta información"})
        };
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
        return res.status(200).json({error: false, allTracking});
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error:true, message: "Error del servidor para trer todas las trazabilidades" });
    }
};

export const getTracking = async (req: Request, res: Response) => {
    const { api_key, idfiles } = req.body;
    try {
        if( api_key !== process.env.API_KEY ){
            return res.status(401).json({error: true, message: "No cuentas con los permisos para acceder a esta información"});
        };
        if (missingData([idfiles])){
            return res.status(400).json({ error: true, message: "MISSING_VALUES" });
        };
        const [ validate ] = await connection.query(`SELECT count(*) as contador FROM tracking WHERE idfiles = ?;`, [ idfiles ])
        //@ts-ignore
        if (validate[0].contador === 0) {
            return res.status(200).json({ error:true ,message: `el idfile: ${ idfiles }, no se encuentra registrado en la base de datos`})
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
		    			WHERE F.idfiles = ?;`, [ idfiles ]);
        return res.status(200).json({ error: false, tracking });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error:true, message: "Error del servidor para una trazabilidad" });
    }
};

export const postTraking = async ( idfiles_states: number, idfiles: number, idusers: number, tracking_observation: string ) => {
    try {
        await connection.query(`INSERT INTO tracking (idfiles_states, idfiles, idusers, tracking_observation, tracking_date)
            VALUES ( ?, ?, ?, ?, ? );`, [idfiles_states, idfiles, idusers, tracking_observation, new Date()]);
        return console.log("Tracking agregado");
    } catch (error) {
        // console.log(error);
        return { error: true, message: "Error del servidor para agregar una trazabilidad" };
    }
};