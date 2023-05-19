import { Request, Response } from 'express';
import { missingData } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { errorMessage, success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getAllRegisteredFileModel,getIdentificationByTypeModel, getTypeIdentificationModel, registeredFilterModel, accountTypeFilterModel, actionFilterModel } from '../models/filters.models';


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

// TRAER LOS USUARIOS (PROVEEDOR) SEGÚN EL TIPO DE DOCUMENTO
export const getIdentificationByType  = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { users_identification_type } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({users_identification_type}).error) return res.status(422).json(uncompleted(missingData({users_identification_type}).missing));
        const info = await getIdentificationByTypeModel(users_identification_type);
        return res.status(200).json(success(info.data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};

// TRAER LOS TIPOS DE DOCUMENTOS
export const getTypeIdentification  = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json({ error: false, message: "SUCCESS", data: getTypeIdentificationModel().data });
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};

// FILTRO DE ARCHIVOS Y RUTAS, SEGÚN RADICADO
export const registeredFilter = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { files_registered } = req.body;
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData({files_registered}).error) return res.status(422).json(uncompleted(missingData({files_registered}).missing));
        const info = await registeredFilterModel(files_registered);
        return res.status(200).json(success(info.data, info.message, undefined, info.path));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// FILTRO DE ARCHIVOS Y RUTAS, SEGÚN TIPO Y NUMERO DE CUENTA
export const accountTypeFilter = async ( req:Request, res: Response ) => {
    const { api_key } = req.headers;
    const { files_account_type, files_account_type_number } = req.body;
    const data = { files_account_type, files_account_type_number };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await accountTypeFilterModel(data);
        return res.status(200).json(success(info.data, info.message, undefined, info.path));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};


/**
 * FILTROS DE ARCHIVOS
 */

export const actionFilter = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles } = req.body;
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData({idroles}).error) return res.status(422).json(uncompleted(missingData({idroles}).missing));
        const info = await actionFilterModel(idroles);
        info.data
            ? res.status(200).json(success(info.data))
            : res.status(200).json(errorMessage(info.message!));

    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};