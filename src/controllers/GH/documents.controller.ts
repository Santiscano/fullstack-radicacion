import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postDocumentsModel,  putDocumentsModel } from '../../models/GH/documents.model';
import { TypeDocuments } from '../../interfaces/GH/documents.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getDocuments = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("documents")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdDocuments = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("documents", "iddocuments", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postDocuments = async (req: Request, res: Response) => {
    const { iddocuments_type, idhiring, documents_creation_date, documents_path } = req.body;
    const validate:TypeDocuments = { iddocuments_type, idhiring, documents_creation_date, documents_path };
    const data:TypeDocuments = { iddocuments_type, idhiring, documents_creation_date, documents_path };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postDocumentsModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putDocuments = async (req: Request, res: Response) => {
    const { iddocuments, iddocuments_type, idhiring, documents_creation_date, documents_path }= req.body;
    const data:TypeDocuments = { iddocuments, iddocuments_type, idhiring, documents_creation_date, documents_path };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putDocumentsModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteDocuments = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("documents", "iddocuments", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};