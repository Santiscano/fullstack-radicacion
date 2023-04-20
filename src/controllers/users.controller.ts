import "dotenv/config";
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { identificationDigitVerified } from '../utilities/identificationDigitVerified.utilities';
import auth from '../config/firebase/auth';
import { missingData, missingDataObject } from '../utilities/missingData.utilities';
import { Users } from '../interfaces/users.interface';
import { success, unsuccessfully, unauthorized, uncompleted } from "../utilities/responses.utilities";
import { getUsersModel, postUsersModel } from '../models/users.model';

// TRAER USUARIOS
export const getUsers = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    try {
        api_key !== process.env.API_KEY
            ? res.status(401).json(unauthorized()) 
            : res.status(200).json(success(await getUsersModel()));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR USUARIOS
export const postUsers = async (req: Request, res: Response) => {
    try {
        const { api_key } = req.headers;
        const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date } = req.body;
        const validate = { idroles, idsedes, users_identification_type, users_identification, users_name, users_address, users_phone, users_email };
        const data: Users = { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date };
        
        if (api_key !== process.env.API_KEY) return res.status(401).json(unauthorized()) 
        if (missingDataObject(validate).error) return res.status(422).json(uncompleted(missingDataObject(validate).missing))
        
            const info = await postUsersModel(data);
            return res.status(200).json(success(info.data, info.message, info.firebase));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// Editar usuarios PUT
export const putUsers = async (req:Request, res:Response) =>{
    const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email,users_providers_paydays,users_providers_expiration_date,users_status } = req.body;
    try {
        let [ validate ] = await connection.query(`
        SELECT count(*) AS contador FROM users WHERE users_identification = ? AND users_identification_type = ?;  
        `, [ users_identification, users_identification_type ]);
        // @ts-ignore
        if(parseInt(validate[0].contador) === 0){
            return res.status(201).json({ message: `El Usuario con ${ users_identification_type }: ${users_identification}, no se encuentra registrado en la base de datos` })
        } else {
            await connection.query(`
                UPDATE users SET 
                    idroles = ?,
                    idsedes = ?,
                    users_name = ?,
                    users_lastname = ?,
                    users_address = ?,
                    users_phone = ?,
                    users_email = ?,
                    users_providers_paydays = ?,
                    users_providers_expiration_date = ?,
                    users_status = ?
                        WHERE users_identification = ? AND users_identification_type = ?;`, 
                    [ idroles,
                    idsedes,
                    users_name.toUpperCase(),
                    users_lastname.toUpperCase(),
                    users_address.toUpperCase(),
                    users_phone,
                    users_email.toUpperCase(),
                    users_providers_paydays,
                    users_providers_expiration_date,
                    users_status.toUpperCase(),
                    users_identification,
                    users_identification_type ]);
            const [ userInfo ] = await connection.query(`
                SELECT * FROM users WHERE users_identification = ? AND users_identification_type = ?;
            `, [ users_identification, users_identification_type ]);
            return res.status(200).json({edited: `Usuario con ${ users_identification_type }: ${ users_identification } editado satisfactoriamente`,userInfo})
        };
    } catch(err){
        // console.log(err);
        return res.status(508).json({message: `Error del servidor para editar el usuario con ${ users_identification_type }: ${ users_identification }`})
    };
};

// Eliminar usuario DELETE
export const deleteUser = async (req: Request, res: Response) => {
    let { users_identification, users_identification_type } = req.body;
    try {
        let [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM users WHERE users_identification = ? AND users_identification_type = ?;
        `, [ users_identification, users_identification_type ]);
        // @ts-ignore
        if(parseInt(validate[0].contador) === 0){
            return res.status(401).json({ message: `El usuario con ${users_identification_type}: ${users_identification}, no se encuentra registrado en la base de datos` })
        } else {
            await connection.query(`
                DELETE FROM users WHERE users_identification = ? AND users_identification_type = ?;
            `, [ users_identification, users_identification_type ]);
            return res.status(200).json({ message: `El usuario con la ${users_identification_type}: ${users_identification}, eliminado satisfactoriamente de la base de datos` });
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json({message: "Error del servidor para eliminar al usuario"})
    };
};
