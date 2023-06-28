import { Request, Response } from 'express';
import { success, unauthorized, unsuccessfully } from '../utilities/responses.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { getFileStatesModel } from '../models/file_states.model';


// TRAER LOS ESTADOS DE LOS ARCHIVOS
export const getFileStates = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getFileStatesModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
