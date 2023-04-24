import 'dotenv/config';
import { Request, Response } from 'express';
import { JsonObject } from 'swagger-ui-express';
import { connection } from '../config/database/db';
import { missingData, missingDataObject } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getAllRegisteredFileModel,getIdentificationByTypeModel, getTypeIdentificationModel } from '../models/filters.models';


// TRAER TODOS LOS RADICADOS (SOLO RADICADO)
export const getAllRegisteredFile = async (req:Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if ( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getAllRegisteredFileModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAER LOS USUARIOS (PROVEEDOR) SEGUN TIPO DE DOCUMENTO
export const getIdentificationByType  = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { users_identification_type } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({users_identification_type}).error) return res.status(422).json(uncompleted(missingDataObject({users_identification_type}).missing));
        const info = await getIdentificationByTypeModel(users_identification_type);
        return res.status(200).json(success(info.data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};

// Traer la información de los radicados según el tipo de documento
export const getTypeIdentification  = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success(getTypeIdentificationModel().data));
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para traer la información" })
    }
};
// Filtro de archivos según el radicado
export const registeredFilter = async (req: Request, res: Response) => {
    const { api_key, files_registered } = req.body;
    try {
        if( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        if( missingData([files_registered]) ){
            return res.status(400).json({ error: true, message: "ERROR_MISSING_VALUES" });
        };
        const [ dataInfo ] = await connection.query(`
            SELECT * FROM files F
            LEFT JOIN sedes S ON F.idsedes = S.idsedes 
            LEFT JOIN users U ON F.idproviders = U.idusers
                WHERE F.files_registered = ?;`, files_registered );
        //@ts-ignore
        if ( dataInfo.length === 0 ){
            return res.status(401).json({ error: true, message: `No se ha encontado información adjunta al radicado ${files_registered}`})
        };
        //@ts-ignore
        const file = dataInfo[0].idfiles
        const [ path ] = await connection.query(`
            SELECT * FROM files_path WHERE idfiles = ?;
            `,[ file ]);
        return res.status(200).json({ error: false, radicado: dataInfo, rutas: path });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({error: true, message: "Error del servidor para filtrar por registrado"});
    };
};

// Filtro de archivos según el Tipo de cuenta y el numero de cuenta
export const accountTypeFilter = async ( req:Request, res: Response ) => {
    const { api_key, files_account_type, files_account_type_number } = req.body;
    const values: [string, string] = [ files_account_type, files_account_type_number ] 
    try {
        if( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        if( missingData(values) ){
            return res.status(400).json({ error:true, message: "ERROR_MISSING_VALUES" });
        };
        const [ response ] = await connection.query(`
        SELECT * FROM files 
        LEFT JOIN sedes ON files.idsedes = sedes.idsedes 
        LEFT JOIN users ON files.idproviders = users.idusers 
            WHERE files_account_type = ? AND files_account_type_number = ?;
            `,[ files_account_type, files_account_type_number]);
        //@ts-ignore
        if ( response.length === 0 ){
            return res.status(401).json({ error: true, message: `No se ha encontado información adjunta al ${files_account_type} numero ${files_account_type_number}`});
        };
        //@ts-ignore
        const file = response[0].idfiles
        const [ path ] = await connection.query(`
        SELECT * FROM files_path WHERE idfiles = ?;
        `,[ file ]);
        return res.status(200).json({ error: false, response, ruta: path });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error:true, message: "Error del servidor para mostrar la información" });
    };
};