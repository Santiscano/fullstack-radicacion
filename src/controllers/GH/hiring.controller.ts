import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postHiringModel,  putHiringModel } from '../../models/GH/hiring.model';
import { TypeHiring } from '../../interfaces/GH/hiring.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getHiring = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("hiring")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdHiring = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("hiring", "idhiring", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postHiring = async (req: Request, res: Response) => {
    const { idemployees, idposition_company, idcompanys, hiring_entry_date, hiring_departure_date, hiring_salary, hiring_cost_center, hiring_eps, hiring_pension, hiring_family_compensation_fund, hiring_layoffs, hiring_arl, hiring_shirt_size, hiring_pant_size, hiring_shoe_size, hiring_status, hiring_revision } = req.body;
    const validate:TypeHiring = { idemployees, idposition_company, idcompanys, hiring_entry_date, hiring_departure_date, hiring_salary, hiring_cost_center, hiring_eps, hiring_pension, hiring_family_compensation_fund, hiring_layoffs, hiring_arl, hiring_shirt_size, hiring_pant_size, hiring_shoe_size, hiring_status, hiring_revision };
    const data:TypeHiring = { idemployees, idposition_company, idcompanys, hiring_entry_date, hiring_departure_date, hiring_salary, hiring_cost_center, hiring_eps, hiring_pension, hiring_family_compensation_fund, hiring_layoffs, hiring_arl, hiring_shirt_size, hiring_pant_size, hiring_shoe_size, hiring_status, hiring_revision };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postHiringModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putHiring = async (req: Request, res: Response) => {
    const { idhiring, idemployees, idposition_company, idcompanys, hiring_entry_date, hiring_departure_date, hiring_salary, hiring_cost_center, hiring_eps, hiring_pension, hiring_family_compensation_fund, hiring_layoffs, hiring_arl, hiring_shirt_size, hiring_pant_size, hiring_shoe_size, hiring_status, hiring_revision }= req.body;
    const data:TypeHiring = { idhiring, idemployees, idposition_company, idcompanys, hiring_entry_date, hiring_departure_date, hiring_salary, hiring_cost_center, hiring_eps, hiring_pension, hiring_family_compensation_fund, hiring_layoffs, hiring_arl, hiring_shirt_size, hiring_pant_size, hiring_shoe_size, hiring_status, hiring_revision };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putHiringModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteHiring = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("hiring", "idhiring", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};