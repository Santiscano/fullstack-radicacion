import "dotenv/config";
import { Request, Response } from 'express';
import { missingDataObject } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unsuccessfully, unauthorized, uncompleted } from "../utilities/responses.utilities";
import { getTrackingsModel, getTrackingModel } from '../models/tracking.model';


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

export const getTracking = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idfiles } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({idfiles}).error) return res.status(422).json(uncompleted(missingDataObject({idfiles}).missing));
        const info = await getTrackingModel(idfiles);
        return res.status(200).json(success(info.data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
};
