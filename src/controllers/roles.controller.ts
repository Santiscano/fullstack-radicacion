import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { deleteRolModel, getRolesModel, postRolesModel, putRolModel } from '../models/roles.model';
import { missingDataObject } from '../utilities/missingData.utilities';

// TRAER ROLES
export const getRoles = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getRolesModel()).data));
    } catch (error) {
        return res.status(508).json(unsuccessfully(error));
    };
};

// CREAR ROL
export const postRol = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { roles, roles_description } = req.body;
    const data = { roles, roles_description };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingDataObject(data).error) return res.status(422).json(uncompleted(missingDataObject(data).missing));
        const info = await postRolesModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(508).json(unsuccessfully(error));
    };
};

// EDITAR ROL
export const putRol = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, roles, roles_description } = req.body;
    const data = { idroles, roles, roles_description };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingDataObject(data).error) return res.status(422).json(uncompleted(missingDataObject(data).missing));
        const info = await putRolModel(data)
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(508).json(unsuccessfully(error));
    };
};

// ELIMINAR ROL
export const deleteRol = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({idroles}).error) return res.status(422).json(uncompleted(missingDataObject({idroles}).missing));
        return res.status(200).json(success(undefined, (await deleteRolModel(idroles)).message));
    } catch (error) {
        return res.status(508).json(unsuccessfully(error));
    };
};