import { Request, Response } from 'express';
import { centerCostTableModel } from '../../models/centerCost.model';
import { success, unauthorized, unsuccessfully } from '../../utilities/responses.utilities';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';

export const centerCostTable = async(req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await centerCostTableModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};