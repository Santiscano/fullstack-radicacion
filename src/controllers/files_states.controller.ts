import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { nullValidator } from '../utilities/nullValidator';

// Traer los estados de los archivos
export const getFileStates = async (req: Request, res: Response) => {
    const { api_key } = req.body;
    try {
        if( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        const [ data ] = await connection.query('SELECT * FROM files_states;');
        return res.status(200).json({ error: false, data })
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para traer los estados de los archivos" });
    };
};

// Crear un estado de archivo
export const postFileStates = async ( req: Request, res: Response ) => {
    const { files_states, files_states_description } = req.body;
    const values: string[] = [files_states, files_states_description];
    try {
        if(nullValidator(values)){
            return res.status(400).json({ error: true, message: "MISSING_VALUES" });
        };
        const [ fileValidate ] = await connection.query(`
            SELECT count(*) AS contador FROM files_states WHERE files_states = ?;
                `, [ files_states ])
        // @ts-ignore
        if( fileValidate[0].contador === 1 ){
            return res.status(201).json({ error: true, message: `El estado: ${ files_states }, ya se encuentra creado para los archivos` });
        } else {
            await connection.query(`
                INSERT INTO files_states (files_states, files_states_description)
                    VALUES ( ?, ? );
            `, [ files_states.toUpperCase(), files_states_description.toUpperCase() ]);
            const [ fileState ] = await connection.query(`
                SELECT * FROM files_states WHERE files_states = ?;
            `, [ files_states.toUpperCase() ]);
            //@ts-ignore
            return res.status(200).json({error: false, Created: fileState[0]});
        };
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para agregar un estado de archivo" })
    };
};

// Editar un estado de archivo
export const putFileStates = async (req:Request, res: Response) => {
    const { idfiles_states, files_states, files_states_description } = req.body;
    const values: string[] = [idfiles_states, files_states, files_states_description]
    try {
        if(nullValidator(values)){
            return res.status(400).json({ error: true, message: "MISSING_VALUES" });
        };
        const [ fileValidate ] = await connection.query(`
            SELECT count(*) AS contador FROM files_states WHERE idfiles_states = ?;`,
                [ idfiles_states ]);
        //@ts-ignore
        if( fileValidate[0].contador === 0 ){
            return res.status(201).json({error: true, message: `El estado del archivo con id: ${ idfiles_states }, no se encuentra en la base de datos`})
        } else {
            await connection.query(`
                UPDATE files_states SET files_states = ?, files_states_description = ? WHERE idfiles_states = ?;
            `, [ files_states.toUpperCase(), files_states_description.toUpperCase(), idfiles_states ]);
            const [ fileState ] = await connection.query(`SELECT * FROM files_states WHERE idfiles_states = ?;`, [ idfiles_states ]);
            //@ts-ignore
            return res.status(200).json({ error: false,  Edited: fileState[0] });
        };
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para editar un estado de archivo" });
    }
};

// Eliminar un estado de archivo
export const deleteFileStates = async (req:Request, res:Response) => {
    const { api_key, idfiles_states } = req.body;
    const values: string[] = [ idfiles_states ];
    try {
        if ( api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para eliminar un estado" })
        };
        if(nullValidator(values)){
            return res.status(400).json({ error: true, message: "MISSING_VALUES" });
        };
        let [ validate ] = await connection.query(`SELECT count(*) AS contador FROM files_states WHERE idfiles_states = ?;`, [ idfiles_states ]);
        //@ts-ignore
        if( validate[0].contador === 0 ) {
            return res.status(201).json({ error: true, message: `El estado de archivo con id: ${ idfiles_states }, no se encuentra registrado en la base de datos` })
        } else {
            await connection.query(`DELETE FROM files_states WHERE idfiles_states = ?;`, [ idfiles_states ]);
            return res.status(200).json({ error: false, deleted: `El estado de archivo con id: ${ idfiles_states }, fue eliminado satisfactoriamente` });
        };
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar el estado del archivo" })
    };
};