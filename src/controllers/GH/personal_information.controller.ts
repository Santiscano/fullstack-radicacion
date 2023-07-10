import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postPersonalInformationModel,  putPersonalInformationModel } from '../../models/GH/personal_information.model';
import { TypePersonalInformation } from '../../interfaces/GH/personal_information.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getPersonalInformation = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("personal_information")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdPersonalInformation = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("personal_information", "idpersonal_information", req.params.id);
        console.log('dataById: ', dataById);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postPersonalInformation = async (req: Request, res: Response) => {
    const { idhiring, personal_information_residence_address, personal_information_residence_city, personal_information_phone, personal_information_cellphone, personal_information_email, personal_information_civil_status, personal_information_gender, personal_information_academic_level, personal_information_medical_emergency, personal_information_arl_emergency } = req.body;
    const validate:TypePersonalInformation = { idhiring, personal_information_residence_address, personal_information_residence_city, personal_information_phone, personal_information_cellphone, personal_information_email, personal_information_civil_status, personal_information_gender, personal_information_academic_level, personal_information_medical_emergency, personal_information_arl_emergency };
    const data:TypePersonalInformation = { idhiring, personal_information_residence_address, personal_information_residence_city, personal_information_phone, personal_information_cellphone, personal_information_email, personal_information_civil_status, personal_information_gender, personal_information_academic_level, personal_information_medical_emergency, personal_information_arl_emergency };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postPersonalInformationModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putPersonalInformation = async (req: Request, res: Response) => {
    const { idpersonal_information, idhiring, personal_information_residence_address, personal_information_residence_city, personal_information_phone, personal_information_cellphone, personal_information_email, personal_information_civil_status, personal_information_gender, personal_information_academic_level, personal_information_medical_emergency, personal_information_arl_emergency }= req.body;
    const data:TypePersonalInformation = { idpersonal_information, idhiring, personal_information_residence_address, personal_information_residence_city, personal_information_phone, personal_information_cellphone, personal_information_email, personal_information_civil_status, personal_information_gender, personal_information_academic_level, personal_information_medical_emergency, personal_information_arl_emergency };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putPersonalInformationModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deletePersonalInformation = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("personal_information", "idpersonal_information", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};