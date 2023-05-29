import { Request, Response } from 'express';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { deleteRolModel, getAdminNotProviderModel, getIdRolesModel, getRolProviderModel, getRolesModel, postRolesModel, putRolModel } from '../models/roles.model';
import { missingData } from '../utilities/missingData.utilities';

// TRAER ROLES
export const getRoles = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getRolesModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAE IDROLES SEGUN NOMBRE DEL ROL
export const getIdRol = async (req: Request, res:Response) => {
    const { api_key } = req.headers;
    const { roles } = req.params;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData({roles}).error) return res.status(422).json(uncompleted(missingData({roles}).missing));
        return res.status(200).json(success(await getIdRolesModel(roles)).data);
    } catch (err) {
        return res.status(512).json(unsuccessfully(err));
    }
};

// TRAER ROLES ADMIN & PROVEEDOR
export const getRolesNotAdminProvider = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getAdminNotProviderModel()).data));
    } catch (error){
        return res.status(512).json(unsuccessfully(error))
    }
};

// TRAER ROL PROVEEDOR
export const getRolProvider = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try{
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getRolProviderModel()).data));
    } catch(error) {}
};

// CREAR ROL
export const postRol = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { roles, roles_description } = req.body;
    const data = { roles, roles_description };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await postRolesModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// EDITAR ROL
export const putRol = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, roles, roles_description } = req.body;
    const data = { idroles, roles, roles_description };
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await putRolModel(data)
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR ROL
export const deleteRol = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({idroles}).error) return res.status(422).json(uncompleted(missingData({idroles}).missing));
        return res.status(200).json(success(undefined, (await deleteRolModel(idroles)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};