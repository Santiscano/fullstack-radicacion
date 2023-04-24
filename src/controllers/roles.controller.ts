import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getRolesModel, postRolesModel } from '../models/roles.model';
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

// CREAR ROLES
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

// EDITAR ROLES
export const putRol = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, roles, roles_description } = req.body;
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        
        
    } catch (error) {
        // console.log(error);
        return res.status(508).json(`Error del servidor para editar el rol`);
    };
};

// Eliminar un rol DELETE
export const deleteRol = async (req: Request, res: Response) => {
    const { api_key, idroles } = req.body;
    try {
        if ( api_key === process.env.API_KEY ){
            const [ rolValidate ] = await connection.query(`SELECT * FROM roles WHERE idroles = ?;`, [ idroles ]);
            // @ts-ignore
            if ( rolValidate.length == 0){
                return res.status(201).json({ message: `El rol: ${ idroles }, no se encuetra regristrado en la base de datos` });
            } else {
                await connection.query(`DELETE FROM roles WHERE idroles = ?;`, [ idroles ]);
                return res.status(200).json({ message: `El rol: ${ idroles }, fue eliminado satisfactoriamente` });
            };
        } else {
            return res.status(401).json({ message: "No cuentas con los permisos para eliminar un rol" })
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ Error: "Error del servidor para eliminar el rol" });
    };
};