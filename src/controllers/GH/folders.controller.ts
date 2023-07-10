import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postFoldersModel,  putFoldersModel } from '../../models/GH/folders.model';
import { TypeFolders } from '../../interfaces/GH/folders.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getFolders = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("folders")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdFolders = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("folders", "idfolders", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postFolders = async (req: Request, res: Response) => {
    const { folders_name, folders_description } = req.body;
    const validate:TypeFolders = { folders_name, folders_description };
    const data:TypeFolders = { folders_name, folders_description };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postFoldersModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putFolders = async (req: Request, res: Response) => {
    const { idfolders, folders_name, folders_description }= req.body;
    const data:TypeFolders = { idfolders, folders_name, folders_description };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putFoldersModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteFolders = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("folders", "idfolders", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};