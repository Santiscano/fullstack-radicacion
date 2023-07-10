import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postFoldersDocumentsTypeModel,  putFoldersDocumentsTypeModel } from '../../models/GH/folders_documents_type.model';
import { TypeFoldersDocumentsType } from '../../interfaces/GH/folders_documents_type.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getFoldersDocumentsType = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("folders_documents_type")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdFoldersDocumentsType = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("folders_documents_type", "idfolders_documents_type", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postFoldersDocumentsType = async (req: Request, res: Response) => {
    const { idfolders, iddocuments_type } = req.body;
    const validate:TypeFoldersDocumentsType = { idfolders, iddocuments_type };
    const data:TypeFoldersDocumentsType = { idfolders, iddocuments_type };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postFoldersDocumentsTypeModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putFoldersDocumentsType = async (req: Request, res: Response) => {
    const { idfolders_documents_type, idfolders, iddocuments_type }= req.body;
    const data:TypeFoldersDocumentsType = { idfolders_documents_type, idfolders, iddocuments_type };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putFoldersDocumentsTypeModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteFoldersDocumentsType = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("folders_documents_type", "idfolders_documents_type", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};