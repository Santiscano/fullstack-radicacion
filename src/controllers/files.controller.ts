import { Request, Response } from 'express';
import { genRegistered } from '../utilities/generate_file_registered.controller';
import { missingData } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getFilesModel, postFileModel, putFileModel, deleteFileModel } from '../models/files.model';

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
    const data = { files_registered, idsedes, idproviders, idusers, files_type, files_price, files_account_type, files_account_type_number, userSession };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await postFileModel(data);
        console.log('success(info.data, info.message): ', success(info.data, info.message));
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// EDITAR UN ARCHIVO - FILE
export const putFile = async ( req:Request, res:Response ) => {
    const { api_key } = req.headers;
    const { idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_cost_center, files_code_accounting, files_code_treasury, files_price,files_account_type, files_account_type_number,userSession, tracking_observation } = req.body;
    const validate = { idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_price, files_account_type, files_account_type_number, userSession };
    const data = { idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_cost_center, files_code_accounting, files_code_treasury, files_price, files_account_type, files_account_type_number, userSession, tracking_observation };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData(validate).error) return res.status(422).json(uncompleted(missingData(validate).missing));
        const info = await putFileModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR ARCHIVOS - FILE
export const deleteFile = async (req:Request, res:Response) => {
    const { api_key } = req.headers;
    const { files_registered } = req.body;
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData({files_registered}).error) return res.status(422).json(uncompleted(missingData({files_registered}).missing));
        return res.status(200).json(success(undefined, (await deleteFileModel(files_registered)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

