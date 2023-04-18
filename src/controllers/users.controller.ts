import "dotenv/config";
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { calcularDigitoVerificacion } from '../utilities/checkDigit.utilities';
import auth from '../config/firebase/auth';
import { nullValidator } from '../utilities/nullValidator';
import { Users } from '../interfaces/users.interface';
import { number } from "joi";


// Traer usuarios
export const getUsers = async (req: Request, res: Response) =>{
    const { api_key } = req.body;
    try {
        if( api_key !== process.env.API_KEY ){
            return res.status(401).json({error: true, message: "No cuentas con el permiso para acceder a esta información"})
        };
        const [rows] = await connection.query(`
        SELECT * FROM users U 
            LEFT JOIN roles R ON U.idroles = R.idroles 
            LEFT JOIN sedes S ON U.idsedes = S.idsedes`);
        return res.status(200).json({error: false, rows});
    } catch (err) {
        // console.log(err);
        return res.status(508).json({error: true, message: "Error del servidor al traer los usuarios"});
    };
};

// Crear un usuario
export const postUsers = async (req: Request, res: Response) => {
    try {
        let { api_key, idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date }: Users = req.body;
        const values: ( string | number | undefined | Date )[] =  [ idroles, idsedes, users_identification_type, users_identification, users_name, users_address, users_phone, users_email ];
        if( api_key !== process.env.API_KEY ){
            return res.status(401).json({error: true, message: "No cuentas con el permiso para acceder a esta información"})
        };
        if (nullValidator(values)) {
            console.log('entro al if')
            return res.status(422).json({ error: true, message: "MISSING_VALUES" })
        };
        users_lastname === undefined ? users_lastname = "" : users_lastname;
        users_providers_paydays === undefined ? users_providers_paydays = null : users_providers_paydays;
        users_providers_expiration_date === undefined ? users_providers_expiration_date = null : users_providers_expiration_date;
        const digitalCheck: number = calcularDigitoVerificacion(users_identification);
        const [ userEmail ] = await connection.query(`
            SELECT count(*) AS contador FROM users WHERE users_email = ?;
        `, [ users_email ]);
        const [ userDocumentRol ] = await connection.query(`
        SELECT count(*) AS contador FROM users WHERE
            users_identification = ? AND users_identification_type = ? AND idroles = ?;
        `, [ users_identification, users_identification_type, idroles ]);
        // @ts-ignore
        if( userEmail[0].contador !== 0 ){
            return res.status(401).json({ error: true, message: `El email: ${users_email.toUpperCase()}, ya se encuentra registrado en la base de datos.` })
        };
        // @ts-ignore
        if( userDocumentRol[0].contador !== 0 ){
            return res.status(401).json({ error: true, message: `El usuario con rol: ${idroles} y ${users_identification_type}: ${users_identification.toUpperCase()}, ya se encuentra registrado en la base de datos.` })
        };
        await connection.query(`
        INSERT INTO users ( idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email, users_providers_paydays, users_providers_expiration_date, users_identification_digital_check )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
        `, [ 
            idroles, 
            idsedes, 
            users_identification_type,
            users_identification.toUpperCase(),
            users_name.toUpperCase(),
            users_lastname.toUpperCase(),
            users_address.toUpperCase(),
            users_phone,
            users_email.toUpperCase(),
            users_providers_paydays,
            users_providers_expiration_date,
            digitalCheck ]);
        const [ infoUsuario ] = await connection.query(`
            SELECT * FROM users WHERE users_identification = ? AND users_identification_type = ? AND idroles = ?;`,
            [ users_identification, users_identification_type, idroles ]
        );
        if (users_password){
            const firebase = await auth.createUser(users_email, users_password);
            return res.status(200).json({ error: false, message: `Usuario con ${ users_identification_type }: ${ users_identification } y email: ${users_email}, creado satisfactoriamente`, usurio: infoUsuario, firebase})
        };
        return res.status(200).json({error: false, message: `Usuario con ${ users_identification_type }: ${ users_identification } y email: ${users_email}, creado satisfactoriamente`, usurio: infoUsuario})
    } catch (err) {
        // console.log(err);
        return res.status(508).json({ error: true, message: "Error del servidor al crear un usuario" });
    };
};

// Editar usuarios PUT
export const putUsers = async (req:Request, res:Response) =>{
    const { idroles, 
            idsedes, 
            users_identification_type, 
            users_identification, 
            users_name, 
            users_lastname, 
            users_address, 
            users_phone, 
            users_email,
            users_providers_paydays,
            users_providers_expiration_date,
            users_status } = req.body;
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
