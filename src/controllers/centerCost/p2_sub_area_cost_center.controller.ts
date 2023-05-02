import { Request, Response } from "express";
import { missingDataObject } from "../../utilities/missingData.utilities";
import { success, unauthorized, uncompleted, unsuccessfully } from "../../utilities/responses.utilities";
import { apiKeyValidate } from "../../utilities/apiKeyValidate.utilities";
import { getCostSubAreaModel, getCostSubAreaByIdModel, postCostSubAreaModel, deleteCostSubAreaModel } from '../../models/centerCost.model';

// TRAER SUBAREA CENTRO DE COSTOS (CEDI)
export const getCostSubArea = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getCostSubAreaModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAER SUBAREA (CEDI) SEGÚN PK DEL AREA (OPERACIÓN) 
export const getCostSubAreaById = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idcost_center_area } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({idcost_center_area}).error) return res.status(422).json(uncompleted(missingDataObject({idcost_center_area}).missing));
        const info = await getCostSubAreaByIdModel(idcost_center_area);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR SUBAREA CENTRO DE COSTOS (CEDI)
export const postCostSubArea = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idcost_center_area, cost_center_subarea, cost_center_subarea_name } = req.body;
    const data = { idcost_center_area, cost_center_subarea, cost_center_subarea_name };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(data).error) return res.status(422).json(uncompleted(missingDataObject(data).missing));
        const info = await postCostSubAreaModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINIAR SUBAREA CENTRO DE COSTOS (CEDI) / ¿ELIMINAR LAS FK?
export const deleteCostSubArea = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { cost_center_subarea } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({cost_center_subarea}).error) return res.status(422).json(uncompleted(missingDataObject({cost_center_subarea}).missing));
        return res.status(200).json(success(undefined, (await deleteCostSubAreaModel(cost_center_subarea)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
