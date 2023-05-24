import { Request, Response } from 'express';
import { missingData } from '../utilities/missingData.utilities';
import { UserDocumentRol, Users } from '../interfaces/users.interface';
import { success, unsuccessfully, unauthorized, uncompleted, errorMessage } from "../utilities/responses.utilities";
import { getUsersModel, getNoAdminProvModel, getUserbyRolModel, postUsersModel, putUsersModel, deleteUserModel } from '../models/users.model';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';

// TRAER USUARIOS
export const getUsers = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success(await getUsersModel()));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAER USUARIOS MENOS ADMIN Y PROVEEDORES
export const getNoAdminProv = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success(await getNoAdminProvModel()));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// TRAER USUARIOS SEGÚN EL ROL
export const getUserbyRol = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({idroles}).error) return res.status(422).json(uncompleted(missingData({idroles}).missing));
        return res.status(200).json(success((await getUserbyRolModel(idroles)).data));
    } catch(error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR USUARIOS
export const postUsers = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date } = req.body;
    const validate = { idroles, idsedes, users_identification_type, users_identification, users_name, users_address, users_phone, users_email };
    const data: Users = { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized()); 
        if (missingData(validate).error) return res.status(422).json(uncompleted(missingData(validate).missing));
        const info = await postUsersModel(data);
        info.data
            ? res.status(200).json(success(info.data, info.message, info.firebase))
            : res.status(205).json(errorMessage(info.message!));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CARGA MASIVA DE USUARIOS
// export const postMassiveUsers = async (req: Request, res: Response) => {
//     const { api_key } = req.headers;
//     const { rows } = req.body;
//     try {
//         if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized()); 
        
//         for (let i = 0; i < rows.length; i++){
//             const values: ( string | number | undefined | Date )[] =  [ rows[i].idroles, rows[i].idsedes, rows[i].users_identification_type, rows[i].users_identification, rows[i].users_name, rows[i].users_address, rows[i].users_phone, rows[i].users_email ];            
//             if (nullValidator(values)) {
//                 return res.status(422).json({ error: true, message: "MISSING_VALUES" })
//             };
//             rows[i].users_lastname === undefined ? rows[i].users_lastname = "" : rows[i].users_lastname;
//             rows[i].users_providers_paydays === undefined ? rows[i].users_providers_paydays = null : rows[i].users_providers_paydays;
//             rows[i].users_providers_expiration_date === undefined ? rows[i].users_providers_expiration_date = null : rows[i].users_providers_expiration_date;
//             const digitalCheck: number = calcularDigitoVerificacion(rows[i].users_identification);
//             const [ userEmail ] = await connection.query(`
//                 SELECT count(*) AS contador FROM users WHERE users_email = ?;
//             `, [ rows[i].users_email ]);
//             const [ userDocumentRol ] = await connection.query(`
//             SELECT count(*) AS contador FROM users WHERE
//                 users_identification = ? AND users_identification_type = ? AND idroles = ?;
//             `, [ rows[i].users_identification, rows[i].users_identification_type, rows[i].idroles ]);
//             // @ts-ignore
//             if( userEmail[0].contador !== 0 ){
//                 return res.status(401).json({ error: true, message: `El email: ${rows[i].users_email.toUpperCase()}, ya se encuentra registrado en la base de datos.` })
//             };
//             // @ts-ignore
//             if( userDocumentRol[0].contador !== 0 ){
//                 return res.status(401).json({ error: true, message: `El usuario con rol: ${rows[i].idroles} y ${rows[i].users_identification_type}: ${rows[i].users_identification.toUpperCase()}, ya se encuentra registrado en la base de datos.` })
//             };
//             await connection.query(`
//             INSERT INTO users ( idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email, users_providers_paydays, users_providers_expiration_date, users_identification_digital_check )
//                 VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
//             `, [ 
//                 rows[i].idroles, 
//                 rows[i].idsedes, 
//                 rows[i].users_identification_type,
//                 rows[i].users_identification.toUpperCase(),
//                 rows[i].users_name.toUpperCase(),
//                 rows[i].users_lastname.toUpperCase(),
//                 rows[i].users_address.toUpperCase(),
//                 rows[i].users_phone,
//                 rows[i].users_email.toUpperCase(),
//                 rows[i].users_providers_paydays,
//                 rows[i].users_providers_expiration_date,
//                 digitalCheck ]);
//                 console.log({error: false, message: `Usuario con ${ rows[i].users_identification_type }: ${ rows[i].users_identification } y email: ${rows[i].users_email}, creado satisfactoriamente`})
//             }
//             return res.status(200).json({error: false, message: "TODO MELO"})
//     } catch (error) {
//         return res.status(512).json(unsuccessfully(error));
//     };
// };

// EDITAR USUARIOS
export const putUsers = async ( req:Request, res:Response ) => {
    const { api_key } = req.headers;
    const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email, users_providers_paydays,users_providers_expiration_date,users_status } = req.body;
    const validate = { idroles, idsedes, users_identification_type, users_identification, users_name, users_address, users_phone, users_email,users_status };
    const data: Users = { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email,users_providers_paydays,users_providers_expiration_date,users_status }
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(validate).error) return res.status(422).json(uncompleted(missingData(validate).missing));
        const info = await putUsersModel(data);
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINIAR USUARIOS
export const deleteUser = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idroles, users_identification, users_identification_type } = req.body;
    const validate: UserDocumentRol = { idroles, users_identification, users_identification_type };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(validate).error) return res.status(422).json(uncompleted(missingData(validate).missing));
        const info = await deleteUserModel(validate);
        return res.status(200).json(success( undefined, info.message ));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
