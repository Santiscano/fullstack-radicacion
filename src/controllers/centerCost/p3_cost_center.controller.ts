import { Request, Response } from "express";
import { missingData } from "../../utilities/missingData.utilities";
import { apiKeyValidate } from "../../utilities/apiKeyValidate.utilities";
import { success, unauthorized, uncompleted, unsuccessfully } from "../../utilities/responses.utilities";
import { getCostCenterModel, getCostCenterByIdModel, postCostCenterModel, deleteCostCenterModel } from '../../models/centerCost.model';

// TRAER CENTRO DE COSTOS (DEPENDENCIA)
export const getCostCenter = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getCostCenterModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAER CENTRO DE COSTOS (DEPENDENCIA) SEGÚN PK DEL SUBAREA (CEDI)
export const getCostCenterById = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idcost_center_subarea } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({idcost_center_subarea}).error) return res.status(422).json(uncompleted(missingData({idcost_center_subarea}).missing));
        const info = await getCostCenterByIdModel(idcost_center_subarea);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR CENTRO DE COSTOS (DEPENDENCIA)
export const postCostCenter = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idcost_center_subarea, cost_center, cost_center_name } = req.body;
    const data = { idcost_center_subarea, cost_center, cost_center_name };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await postCostCenterModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR UN CENTRO DE COSTOS (DEPENDENCIA)
export const deleteCostCenter = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { cost_center } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({cost_center}).error) return res.status(422).json(uncompleted(missingData({cost_center}).missing));
        return res.status(200).json(success(undefined, (await deleteCostCenterModel(cost_center)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
