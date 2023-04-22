import "dotenv/config";
import { Request, Response } from 'express';
import { missingDataObject } from '../utilities/missingData.utilities';
import { UserDocumentRol, Users } from '../interfaces/users.interface';
import { success, unsuccessfully, unauthorized, uncompleted } from "../utilities/responses.utilities";
import { getUsersModel, postUsersModel, putUsersModel, deleteUserModel } from '../models/users.model';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';

// TRAER USUARIOS
export const getUsers = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success(await getUsersModel()));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR USUARIOS
export const postUsers = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date } = req.body;
    const validate = { idroles, idsedes, users_identification_type, users_identification, users_name, users_address, users_phone, users_email };
    const data: Users = { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized()); 
        if (missingDataObject(validate).error) return res.status(422).json(uncompleted(missingDataObject(validate).missing));
        const info = await postUsersModel(data);
        return res.status(200).json(success(info.data, info.message, info.firebase));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// EDITAR USUARIOS
export const putUsers = async ( req:Request, res:Response ) => {
    const { api_key } = req.headers;
    const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email, users_providers_paydays,users_providers_expiration_date,users_status } = req.body;
    const validate = { idroles, idsedes, users_identification_type, users_identification, users_name, users_address, users_phone, users_email,users_status };
    const data: Users = { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email,users_providers_paydays,users_providers_expiration_date,users_status }
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(validate).error) return res.status(422).json(uncompleted(missingDataObject(validate).missing));
        const info = await putUsersModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINIAR USUARIOS
export const deleteUser = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, users_identification, users_identification_type } = req.body;
    const validate: UserDocumentRol = { idroles, users_identification, users_identification_type };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(validate).error) return res.status(422).json(uncompleted(missingDataObject(validate).missing));
        const info = await deleteUserModel(validate);
        return res.status(200).json(success( undefined, info.message ));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
