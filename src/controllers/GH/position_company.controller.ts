import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postPositionCompanyModel,  putPositionCompanyModel } from '../../models/GH/position_company.model';
import { TypePositionCompany } from '../../interfaces/GH/position_company.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getPositionCompany = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("position_company")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdPositionCompany = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("position_company", "idposition_company", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postPositionCompany = async (req: Request, res: Response) => {
    const { position_company_name } = req.body;
    const validate:TypePositionCompany = { position_company_name };
    const data:TypePositionCompany = { position_company_name };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postPositionCompanyModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putPositionCompany = async (req: Request, res: Response) => {
    const { idposition_company, position_company_name }= req.body;
    const data:TypePositionCompany = { idposition_company, position_company_name };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putPositionCompanyModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deletePositionCompany = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("position_company", "idposition_company", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};