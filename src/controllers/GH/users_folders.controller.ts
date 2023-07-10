import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postUsersFoldersModel,  putUsersFoldersModel } from '../../models/GH/users_folders.model';
import { TypeUsersFolders } from '../../interfaces/GH/users_folders.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getUsersFolders = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("users_folders")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdUsersFolders = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("users_folders", "idusers_folders", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postUsersFolders = async (req: Request, res: Response) => {
    const { idusers, idfolders } = req.body;
    const validate:TypeUsersFolders = { idusers, idfolders };
    const data:TypeUsersFolders = { idusers, idfolders };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postUsersFoldersModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putUsersFolders = async (req: Request, res: Response) => {
    const { idusers_folders, idusers, idfolders }= req.body;
    const data:TypeUsersFolders = { idusers_folders, idusers, idfolders };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putUsersFoldersModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteUsersFolders = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("users_folders", "idusers_folders", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};