import { Request, Response } from 'express';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';
import { errorMessage, success, unauthorized, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postPositionModel } from '../../models/GH/position.model';
import { missingData } from '../../utilities/missingData.utilities';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';


const apiTable: string = "position_company";
const apiPkAttribute: string = `id${apiTable}`

// TRAER TODAS LAS POSICIONES (CARGOS)
export const getAllPosition = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        return res.status(200).json(success(await getAllRowsTable(apiTable)));
    } catch (error) {
        return res.status(412).json(unsuccessfully(error))
    };
};

// CREAR UNA NUEVA POSICIÓN (CARGO)
export const postPosition = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { position_company_name } = req.body;
    try {
        if( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        if( missingData({position_company_name}).error ) return res.status(422).json(uncompleted(missingData({position_company_name}).missing));
        const info = await postPositionModel(position_company_name);
        info.message === undefined
            ? res.status(200).json(success(undefined))
            : res.status(201).json(errorMessage(info.message))
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR UNA POSICIÓN
export const deletePosition = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { id } = req.params;
    try {
        if( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        return res.status(200).json(success(undefined, (await deleteRowTable(apiTable, apiPkAttribute, id)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
}