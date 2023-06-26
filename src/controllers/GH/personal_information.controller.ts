import { Request, Response } from 'express';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';
import { errorMessage, success, unauthorized, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postPersonalInformationModel, putPersonalInformationModel, deletePersonalInformationModel } from '../../models/GH/personal_information.model';
import { missingData } from '../../utilities/missingData.utilities';
import { getAllRowsTable } from '../../utilities/SQL/getTable.utilities';

// TRAER INFORMACIÓN PERSONAL
export const getPersonalInformation = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success(await getAllRowsTable("personal_information")));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR INFORMACIÓN PERSONAL DE UN USUARIO
export const postPersonalInformation = async (req:Request, res:Response) => {
    const { api_key } = req.headers;
    const { 
        idusers, 
        personal_information_family_compensation_fund, 
        personal_information_pension, 
        personal_information_layoffs, 
        personal_information_eps, 
        personal_information_arl, 
        personal_information_medical_emergency, 
        personal_information_arl_emergency, 
        personal_information_rh, 
        personal_information_academic_level, 
        personal_information_birthdate, 
        personal_information_gender, 
        personal_information_civil_status, 
        personal_information_city, 
        personal_information_shirt_size, 
        personal_information_pant_size, 
        personal_information_shoe_size 
    } = req.body;
    const data = { idusers, personal_information_family_compensation_fund, personal_information_pension, personal_information_layoffs, personal_information_eps, personal_information_arl, personal_information_medical_emergency, personal_information_arl_emergency, personal_information_rh, personal_information_academic_level, personal_information_birthdate, personal_information_gender, personal_information_civil_status, personal_information_city, personal_information_shirt_size, personal_information_pant_size, personal_information_shoe_size }
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await postPersonalInformationModel(data);
        info.data 
            ? res.status(200).json(success(info.data))
            : res.status(200).json(errorMessage(info.message!));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// EDITAR LA INFORMACIÓN PERSONAL DE UN USUARIO
export const putPersonalInformation = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { 
        idusers, 
        personal_information_family_compensation_fund, 
        personal_information_pension, 
        personal_information_layoffs, 
        personal_information_eps, 
        personal_information_arl, 
        personal_information_medical_emergency, 
        personal_information_arl_emergency, 
        personal_information_rh, 
        personal_information_academic_level, 
        personal_information_birthdate, 
        personal_information_gender, 
        personal_information_civil_status, 
        personal_information_city, 
        personal_information_shirt_size, 
        personal_information_pant_size, 
        personal_information_shoe_size 
    } = req.body;
    const data = { idusers, personal_information_family_compensation_fund, personal_information_pension, personal_information_layoffs, personal_information_eps, personal_information_arl, personal_information_medical_emergency, personal_information_arl_emergency, personal_information_rh, personal_information_academic_level, personal_information_birthdate, personal_information_gender, personal_information_civil_status, personal_information_city, personal_information_shirt_size, personal_information_pant_size, personal_information_shoe_size }
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await putPersonalInformationModel(data);
        info.data
            ? res.status(200).json(success(info.data, info.message))
            : res.status(200).json(errorMessage(info.message!))
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR LA INFORMACIÓN PERSONAL DE UN USUARIO
export const deletePersonalInformation = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idusers } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({idusers}).error) return res.status(422).json(uncompleted(missingData({idusers}).missing));
        return res.status(200).json(success(undefined, (await deletePersonalInformationModel(idusers)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};