import { Request, Response } from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { UserDocumentRol, Users } from '../../interfaces/users.interface';
import { success, unsuccessfully, unauthorized, uncompleted, errorMessage } from "../../utilities/responses.utilities";
import { employeeFilterModel } from '../../models/GH/filter.model';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';

export const employeeFilter = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { employee } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({employee}).error) return res.status(422).json(uncompleted(missingData({employee}).missing));
        const info = await employeeFilterModel(employee);
        return res.status(200).json(success(info.data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
}