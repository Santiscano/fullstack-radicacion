import { Request, Response} from 'express';
import { missingData } from '../../utilities/missingData.utilities';
import { errorMessage, success, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import { postEmergencyContactModel,  putEmergencyContactModel } from '../../models/GH/emergency_contact.model';
import { TypeEmergencyContact } from '../../interfaces/GH/emergency_contact.interface';
import { getOneRowTable, getAllRowsTable } from '../../utilities/SQL/getTable.utilities';
import { deleteRowTable } from '../../utilities/SQL/deleteTable.utilities';

// TRAER TODOS LOS DATOS
export const getEmergencyContact = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(await getAllRowsTable("emergency_contact")));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// TRAER SEGUN ID
export const getByIdEmergencyContact = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const dataById: any = await getOneRowTable("emergency_contact", "idemergency_contact", req.params.id);
        dataById.data
            ? res.status(200).json(success(dataById.data, dataById.message))
            : res.status(417).json(errorMessage(dataById.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};

// CREAR DATOS 
export const postEmergencyContact = async (req: Request, res: Response) => {
    const { idpersonal_information, emergency_contact_name, emergency_contact_lastname, emergency_contact_relationship, emergency_contact_phone, emergency_contact_cell_phone } = req.body;
    const validate:TypeEmergencyContact = { idpersonal_information, emergency_contact_name, emergency_contact_lastname, emergency_contact_relationship, emergency_contact_phone, emergency_contact_cell_phone };
    const data:TypeEmergencyContact = { idpersonal_information, emergency_contact_name, emergency_contact_lastname, emergency_contact_relationship, emergency_contact_phone, emergency_contact_cell_phone };
    try{
        const missing = missingData(validate);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const postData = await postEmergencyContactModel(data);
        postData.data
            ? res.status(200).json(success(postData.data, postData.message))
            : res.status(417).json(errorMessage(postData.message))
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ACTUALIZAR DATOS 
export const putEmergencyContact = async (req: Request, res: Response) => {
    const { idemergency_contact, idpersonal_information, emergency_contact_name, emergency_contact_lastname, emergency_contact_relationship, emergency_contact_phone, emergency_contact_cell_phone }= req.body;
    const data:TypeEmergencyContact = { idemergency_contact, idpersonal_information, emergency_contact_name, emergency_contact_lastname, emergency_contact_relationship, emergency_contact_phone, emergency_contact_cell_phone };
    try{
        const missing = missingData(data);
        if(missing.error) return res.status(422).json(uncompleted(missing.missing));
        const putData = await putEmergencyContactModel(data);
        putData.data
            ? res.status(200).json(success(putData.data, putData.message))
            : res.status(417).json(errorMessage(putData.message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};
    
// ELIMINAR DATOS 
export const deleteEmergencyContact = async (req: Request, res: Response) => {
    try{
        return res.status(200).json(success(undefined, (await deleteRowTable("emergency_contact", "idemergency_contact", req.params.id)).message));
    } catch(err) {
        return res.status(512).json(unsuccessfully(err))
    }
};