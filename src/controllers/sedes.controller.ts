import 'dotenv/config';
import { Request, Response } from 'express';
import { missingDataObject } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { deleteSedeModel, getSedesModel, postSedeModel, putSedeModel } from '../models/sedes.model';


// TRAER CEDIS
export const getSedes = async ( req: Request, res: Response ) =>{
    const { api_key, authorization } = req.headers;
    console.log('api_key enviada: ', api_key, authorization);
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getSedesModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR CEDI
export const postSede = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { sedes_country, sedes_state, sedes_city, sedes_address, sedes_name, sedes_type} = req.body;
    const values = { sedes_country, sedes_state, sedes_city, sedes_address, sedes_name, sedes_type };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(values).error) return res.status(422).json(uncompleted(missingDataObject(values).missing));
        const info = await postSedeModel(values)
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// EDITAR CEDI
export const putSede = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { idsedes, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state } = req.body;
    const data = { idsedes, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(data).error) return res.status(422).json(uncompleted(missingDataObject(data).missing));
        const info = await putSedeModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR CEDI
export const deleteSede = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { idsedes } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if ( missingDataObject({idsedes}).error ) return res.status(422).json(uncompleted(missingDataObject({idsedes}).missing));
        const info = await deleteSedeModel(idsedes);
        return res.status(200).json(success(undefined, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};