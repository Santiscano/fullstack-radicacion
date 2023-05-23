import { Request, Response } from 'express';
import { missingData } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unsuccessfully, unauthorized, uncompleted, errorMessage } from "../utilities/responses.utilities";
import { getTrackingsModel, getTrackingRegisteredModel, getTrackingAccountTypeModel } from '../models/tracking.model';


// TRAER TODOS LOS TRACKINGS
export const getTrackings = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        const info = await getTrackingsModel();
        return res.status(200).json(success(info.data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};

// TRAER UN TRACKING SEGÚN EL RADICADO
export const getTrackingRegistered = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { files_registered } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({files_registered}).error) return res.status(422).json(uncompleted(missingData({files_registered}).missing));
        const info = await getTrackingRegisteredModel(files_registered);
        info.data
            ? res.status(200).json(success(info.data))
            : res.status(200).json(errorMessage(info.message!));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};

// TRAER UN TRACKING SEGÚN LA CUENTA Y NUMERO DE COBRO
export const getTrackingAccountType = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { files_account_type, files_account_type_number } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({files_account_type, files_account_type_number}).error) return res.status(422).json(uncompleted(missingData({files_account_type, files_account_type_number}).missing));
        const info = await getTrackingAccountTypeModel(files_account_type, files_account_type_number);
        info.data
            ? res.status(200).json(success(info.data))
            : res.status(200).json(errorMessage(info.message!));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};