import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { genRegistered } from '../utilities/generate_file_registered.controller';
import { missingData, missingDataObject } from '../utilities/missingData.utilities';
import { postTrakingModel } from '../models/tracking.model';
import { createPDF } from '../utilities/PDF/createPDF';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getFilesModel, postFileModel } from '../models/files.model';

// GENERAR UN NUMERO DE RADICADO
export const genFileRegistered = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers; 
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json({ error: false, message: "SUCCESS", data: await genRegistered() });
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAER LOS ARCHIVOS - FILE
export const getFiles = async ( req:Request, res:Response ) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getFilesModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// AGREGAR UN ARCHIVO - FILE
export const postFile = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { files_registered, idsedes, idproviders, idusers, files_type, files_price, files_account_type, files_account_type_number, userSession } = req.body;
    const data = { files_registered, idsedes, idproviders, idusers, files_type, files_price, files_account_type, files_account_type_number, userSession }
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingDataObject(data).error) return res.status(422).json(uncompleted(missingDataObject(data).missing));
        const info = await postFileModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// Editar un archivo
export const putFile = async ( req:Request, res:Response ) => {
    const { idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_cost_center, files_code_accounting, files_code_treasury, files_price,files_account_type, files_account_type_number,userSession, tracking_observation } = req.body;
    const values = [idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_price, files_account_type, files_account_type_number, userSession, tracking_observation]
    try {
        if (missingData(values)){
            return res.status(422).json({error: true, message: "MISSING_VALUES"});
        };
        const [ data ] = await connection.query(`SELECT count(*) AS contador FROM files WHERE idfiles = ? OR files_registered = ?;`,
        [ idfiles, files_registered ]);
        // @ts-ignore
        if ( data[0].contador === 0 ) {
            return res.status(404).json({ error: true, message: `Archivo con el id: ${ idfiles } o radicado: ${ files_registered }, no se encuentra registrado en la base de datos` })
        };
        await connection.query(`
            UPDATE files SET
                idproviders = ?, 
                idusers = ?, 
                idfiles_states = ?, 
                files_type = ?,
                files_cost_center = ?, 
                files_code_accounting = ?, 
                files_code_treasury = ?, 
                files_price = ?,
                files_account_type = ?, 
                files_account_type_number = ?
                    WHERE idfiles = ? OR files_registered = ?;`,
                [ idproviders,
                idusers,
                idfiles_states,
                files_type.toUpperCase(),
                files_cost_center,
                files_code_accounting,
                files_code_treasury,
                files_price, 
                files_account_type.toUpperCase(), 
                files_account_type_number.toUpperCase(), 
                idfiles, files_registered ]);
        const [ fileUpdated ] = await connection.query(`
            SELECT * FROM files WHERE idfiles = ? OR files_registered = ?;`,
            [ idfiles, files_registered ]);
        postTrakingModel(idfiles_states, idfiles, userSession, tracking_observation.toUpperCase());
        //@ts-ignore
        return res.status(200).json({ error: false, tracking: "Cargado exitosamente", fileUpdated });
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ error: true, message: "Error del servidor para edutar un archivo" })
    };
};

// Eliminar un archivo
export const deleteFile = async (req:Request, res:Response) => {
    const { api_key, files_registered } = req.body;
    const values = [ files_registered ]
    try {
        if( api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para eliminar un archivo" })
        };
        if (missingData(values)) {
            return res.status(422).json({error: true, message: "MISSING_VALUES"});
        };
        const [ data ] = await connection.query(`SELECT idfiles FROM files WHERE files_registered = ?;`, files_registered );
        //@ts-ignore
        if( data[0] === undefined ) {
            return res.status(508).json({error: true, message: `Radicado: ${files_registered}, no existe en el sistema`});
        }
        //@ts-ignore
        const idfiles = data[0].idfiles;
        await connection.query(`DELETE FROM tracking WHERE idfiles = ?;`, [ idfiles ]);
        // console.log("Eliminado del tracking");
        await connection.query(`DELETE FROM files_path WHERE idfiles = ?;`, [ idfiles ])
        // console.log("Eliminado de las rutas");
        await connection.query(`DELETE FROM files WHERE idfiles = ?;`, [ idfiles ]);
        // console.log("Eliminado del los archivos");
        return res.status(200).json({error: false, message: `Archivo con radicado: ${files_registered}, ha sido eliminado`})
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar un archivo" })
    };
};

