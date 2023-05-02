import { Request, Response } from "express";
import { missingDataObject } from "../../utilities/missingData.utilities";
import { apiKeyValidate } from "../../utilities/apiKeyValidate.utilities";
import { success, unauthorized, uncompleted, unsuccessfully } from "../../utilities/responses.utilities";
import { getCostAreaModel, postCostAreaModel, deleteCostAreaModel } from '../../models/centerCost.model';


// TRAER AREA CENTRO DE COSTOS (OPERACIÓN)
export const getCostArea = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getCostAreaModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR AREA CENTRO DE COSTOS (OPERACIÓN)
export const postCostArea = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { cost_center_area, cost_center_area_name } = req.body;
    const data = {cost_center_area, cost_center_area_name}; 
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(data).error) return res.status(422).json(uncompleted(missingDataObject(data).missing));
        const info = await postCostAreaModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINIAR AREA CENTRO DE COSTOS (OPERACIÓN) / ¿ELIMINAR LAS FK?
export const deleteCostArea = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { cost_center_area } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({cost_center_area}).error) return res.status(422).json(uncompleted(missingDataObject({cost_center_area}).missing));
        return res.status(200).json(success(undefined, (await deleteCostAreaModel(cost_center_area)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

