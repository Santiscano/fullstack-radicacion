import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postEmployeesModel,  putEmployeesModel } from '../../models/GH/employees.model';
import { TypeEmployees } from '../../interfaces/GH/employees.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getEmployees = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("employees")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdEmployees = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("employees", "idemployees", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postEmployees = async (req: Request, res: Response) => {
    const { employees_name, employees_lastname, employees_identification_type, employees_identification, employees_rh, employees_birthdate_date, employees_birthdate_city, employees_photo_path } = req.body;
    const validate:TypeEmployees = { employees_name, employees_lastname, employees_identification_type, employees_identification, employees_rh, employees_birthdate_date, employees_birthdate_city, employees_photo_path };
    const data:TypeEmployees = { employees_name, employees_lastname, employees_identification_type, employees_identification, employees_rh, employees_birthdate_date, employees_birthdate_city, employees_photo_path };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postEmployeesModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putEmployees = async (req: Request, res: Response) => {
    const { idemployees, employees_name, employees_lastname, employees_identification_type, employees_identification, employees_rh, employees_birthdate_date, employees_birthdate_city, employees_photo_path }= req.body;
    const data:TypeEmployees = { idemployees, employees_name, employees_lastname, employees_identification_type, employees_identification, employees_rh, employees_birthdate_date, employees_birthdate_city, employees_photo_path };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putEmployeesModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteEmployees = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("employees", "idemployees", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};