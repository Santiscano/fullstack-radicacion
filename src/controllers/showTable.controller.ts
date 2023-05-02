import { Request, Response } from 'express';
import { missingData } from '../utilities/missingData.utilities';
import { success, unsuccessfully, unauthorized, uncompleted } from '../utilities/responses.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { showTableModel } from '../models/showTable.model';


export const showTable = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await showTableModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

export const pendingTable = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idusers } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({idusers}).error) return res.status(422).json(uncompleted(missingData({idusers}).missing));
        return res.status(200).json(success((await showTableModel(idusers)).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};