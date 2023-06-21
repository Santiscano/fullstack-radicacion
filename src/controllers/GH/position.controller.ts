import { Request, Response } from 'express';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';
import { errorMessage, success, unauthorized, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postPositionModel } from '../../models/GH/position.model';
import { missingData } from '../../utilities/missingData.utilities';
import { getAllRowTable } from '../../utilities/SQL/countTable.utilities';


const apiTable: string = "position";
const idTable: string = `id${apiTable}`

// TRAER TODAS LAS POSICIONES (CARGOS)
export const getAllPosition = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        return res.status(200).json(success(await getAllRowTable(apiTable)));
    } catch (error) {
        return res.status(412).json(unsuccessfully(error))
    };
};

// CREAR UNA NUEVA POSICIÓN (CARGO)
export const postPosition = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { position_name } = req.body;
    try {
        if( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        if( missingData({position_name}).error ) return res.status(422).json(uncompleted(missingData(position_name).missing));
        await postPositionModel(position_name);
        return res.status(200).json(success(undefined, `CARGO ${position_name}, CREADO CON ÉXITO`))
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};