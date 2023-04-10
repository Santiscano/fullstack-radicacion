import "dotenv/config";
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { calcularDigitoVerificacion } from '../utilities/checkDigit.utilities';
import auth from '../config/firebase/auth';
import { nullValidator } from '../utilities/nullValidator';


// Traer usuarios
export const getUsers = async (req: Request, res: Response) =>{
    const { api_key } = req.body;
    try {
        if(api_key == process.env.API_KEY){
            const [rows] = await connection.query(`
            SELECT * FROM users U 
                LEFT JOIN roles R ON U.idroles = R.idroles 
                LEFT JOIN sedes S ON U.idsedes = S.idsedes`);
            return res.status(200).json(rows);
        } else {
            return res.status(401).json({error: "No cuentas con el permiso para acceder a esta información"})
        };
    } catch (err) {
        console.log(err);
        return res.status(508).json({error: "Error del servidor al traer los usuarios"});
    };
};

// Crear un usuario
export const postUsers = async (req: Request, res: Response) => {
    try {
        const { idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date } = req.body;
        const [ values ] =  [ idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_password, users_phone, users_email, users_providers_paydays, users_providers_expiration_date ]
        
        if ( nullValidator(values) ) {
            return res.status(400).json({ message: "ERROR_MISSING_VALUES" })
        };
        
        const digitalCheck = calcularDigitoVerificacion(users_identification);
        const  [ user ]  = await connection.query(`
        SELECT * FROM users WHERE users_email = ? OR users_identification = ? AND users_identification_type = ?;
        `, [ users_email, users_identification, users_identification_type ]);
        // @ts-ignore
        if ( [ undefined, null, "" ].includes(user[0]) ) {
            await connection.query(`
            INSERT INTO users ( idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email, users_providers_paydays, users_providers_expiration_date, users_identification_digital_check )
                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
            `, [ 
                idroles, 
                idsedes, 
                users_identification_type.toUpperCase(),
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
                SELECT * FROM users WHERE users_identification = ? AND users_identification_type = ?;`,
                [ users_identification, users_identification_type ]
            );
            const firebase = await auth.createUser(users_email, users_password);
            return res.status(200).json({message: `Usuario con ${ users_identification_type }: ${ users_identification } y email: ${users_email}, creado satisfactoriamente`, usurio: infoUsuario, firebase})
        } else {
            // @ts-ignore
            if ((users_email.toUpperCase() == user[0].users_email)) {
                return res.status(400).json({ mesagge: `El email: ${ users_email }, ya se encuentra registrado en el sistema.` });
            } // @ts-ignore
            else if ((users_identification == user[0].users_identification && users_identification_type.toUpperCase() == user[0].users_identification_type)) {
                return res.status(400).json({mesagge: `El usuario con ${users_identification_type}: ${users_identification}, ya se encuentra registrado en el sistema.`});
            }; 
        };
    } catch (err) {
        console.log(err);
        return res.status(508).json({ error: "Error del servidor al crear un usuario" });
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
        console.log(err);
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
        console.log(error);
        return res.status(508).json({message: "Error del servidor para eliminar al usuario"})
    };
};
