import 'dotenv/config';
import { Request, Response } from 'express';
import { missingData } from '../utilities/missingData.utilities';
import { connection } from '../config/database/db';
import { upload } from '../helpers/multerAddPdf';
import { postTrakingModel } from '../models/tracking.model';

// Traer una ruta del arvhivo
export const getFilesPath = async ( req: Request, res: Response ) => {
    const { api_key } = req.body;
    try {
        if (api_key == process.env.API_KEY) {
            const [ pathFiles ] = await connection.query(`SELECT * FROM files_path;`);
            return res.status(200).json({ pathFiles });
        } else {
            return res.status(401).json({ message: "No cuentas con los permisos para acceder a esta infomación" })
        };
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ message: "Error del servidor para traer las rutas de los archivos" })
    };
};

// Crear y cargar una ruta del archivo
export const postChargeFilePath = async ( req: Request, res: Response ) => {
    const { idfiles, files_path_observation, userSession } = req.params;
    const values = [ idfiles, files_path_observation, userSession ];
    try {
        if (missingData(values)){
            return res.status(400).json({ message: "ERROR_MISSING_VALUES" });
        };
        upload(req, res, async (err) => {
            if ( err ) {
                // console.log(err);
                return res.status(404).send({ message: "Nombre de KEY equivocado para cargar el archivo" });
            }
            if ( req.file ) {
                // console.log( req.file );
                const path = req.file.path;
                await connection.query(`
                    INSERT INTO files_path (idfiles, files_path, files_path_date, files_path_observation) 
                        VALUES (?, ?, ?, ?);
                    `, [ idfiles, path, new Date(), files_path_observation ]);
                const [ filePath ] = await connection.query(`
                    SELECT * FROM files_path WHERE files_path = ?;`, [ path ]);
                postTrakingModel(1, parseInt(idfiles), parseInt(userSession), files_path_observation);
                return res.status(200).json({ error: false, create: filePath, tracking: "Added tracking" });
            };
        });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ message: "Error con el servidor para cargar un archivo" });
    };
};

// Crear una ruta del archivo - Relaciona info archivo
export const postFilePath = async ( req: Request, res: Response ) => {
    const { idfiles, files_path, files_path_observation, userSession } = req.body;
    const values = [idfiles, files_path, files_path_observation, userSession];
    let idfiles_states = 2;                         // ESTADO ARCHIVO CARGADO
    try {
        if ( missingData(values) ){
            return res.status(400).json({ message: "ERROR_MISSING_VALUES" });
        };
        await connection.query(`
            INSERT INTO files_path (idfiles, files_path, files_path_date, files_path_observation) 
                VALUES (?, ?, ?, ?);
            `, [ idfiles, files_path, new Date(), files_path_observation.toUpperCase() ]);
        const [ filePath ] = await connection.query(`
            SELECT * FROM files_path WHERE files_path = ?;`, [ files_path ]);
        postTrakingModel(idfiles_states, parseInt(idfiles), parseInt(userSession), files_path_observation.toUpperCase());
        return res.status(200).json({ error: false, create: filePath, tracking: "Added tracking" });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ message: "Error con el servidor para cargar un archivo" });
    };
};

// Eliminar una ruta del archivo
export const deleteFilePath = async ( req: Request, res: Response ) => {
    const { api_key, idfiles_path } = req.body;
    try {
        if ( api_key === process.env.API_KEY ) {
            const [ validate ] = await connection.query(`
                SELECT count(*) AS contador FROM files_path WHERE idfiles_path = ?;`,
                [ idfiles_path ]);
            //@ts-ignore
                if ( validate[0].contador === 0 ) {
                    return res.status(401).json({ message: `La ruta con id: ${ idfiles_path }, no se cuentra registrtada en la base de datos` })
                } else {
                    await connection.query(`
                        DELETE FROM files_path WHERE idfiles_path = ?;`, [ idfiles_path ]);
                    return res.status(200).json({ deleted: `Ruta de archivo con id: ${ idfiles_path }, eliminada satisfactoriamente` });
                };
        } else {
            return res.status(404).json({ message: "No cuentas con los permisos para acceder a este modulo" })
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ message: "Error del servidor para eliminar una ruta de archivo" })
    };
};