import { Request, Response } from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { UserDocumentRol, Users } from '../../interfaces/users.interface';
import { success, unsuccessfully, unauthorized, uncompleted, errorMessage } from "../../utilities/responses.utilities";
import { getEmployeeByIdModel, getEmployeesModel } from '../../models/GH/users.model';


// TRAER EMPLEADOS
export const getEmployees = async (req:Request, res: Response) => {
    try{
        return res.status(200).json(success(await getEmployeesModel()));
    } catch(error) {
        return res.status(512).json(unsuccessfully(error))
    }
};
// TRAER POR ID
export const getEmployeeById = async (req:Request, res: Response) => {
    const { idusers } = req.params;
    try{
        const missing = missingData({idusers});
        if(missing.error) return res.status(422).json(uncompleted(missing.missing))
        const employeeById = await getEmployeeByIdModel(Number(idusers));
        employeeById.data
            ? res.status(200).json(success(employeeById.data, employeeById.message))
            : res.status(208).json(errorMessage(employeeById.message));
    } catch(error) {
        return res.status(512).json(unsuccessfully(error))
    }
};
// CREAR EMPLEADO
export const postEmployee = async (req:Request, res: Response) => {
    try{} catch(error) {
        return res.status(512).json(unsuccessfully(error))
    }
};
// EDITAR EMPLEADO
export const putEmployee = async (req:Request, res: Response) => {
    try{} catch(error) {
        return res.status(512).json(unsuccessfully(error))
    }
};
// ELIMINAR EMPLEADO
export const deleteEmployee = async (req:Request, res: Response) => {
    try{} catch(error) {
        return res.status(512).json(unsuccessfully(error))
    }
};

