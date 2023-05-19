import 'dotenv/config'
import { connection } from '../config/database/db';
import { identificationDigitVerified } from '../utilities/identificationDigitVerified.utilities';
import { Users, UserDocumentRol } from '../interfaces/users.interface';
import auth from '../config/firebase/auth';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 

// TRAER USUARIOS
export const getUsersModel = async(): Promise<Data> => {
    const [ data ] = await connection.query(`
        SELECT * FROM users U 
            LEFT JOIN roles R ON U.idroles = R.idroles 
            LEFT JOIN sedes S ON U.idsedes = S.idsedes`);
    return data
};

// TRAER USUARIOS SEGÚN EL ROL
export const getUserbyRolModel = async(data: number): Promise<{data: Data}> => {
    const [ users ] = await connection.query('SELECT * FROM users WHERE idroles = ?;',[data])
    return { data: users }
};

// CREAR USUARIOS
export const postUsersModel = async ( data: Users ): Promise<{ message?: string; data?: Data; firebase?: {error: boolean, data: any}  }> => {
    data.users_lastname === undefined ? data.users_lastname = "" : data.users_lastname;
    data.users_providers_paydays === undefined ? data.users_providers_paydays = null : data.users_providers_paydays;
    data.users_providers_expiration_date === undefined ? data.users_providers_expiration_date = null : data.users_providers_expiration_date;
    const digitalCheck: number = identificationDigitVerified(data.users_identification);
    const [ userEmail ]: any = await connection.query(`
        SELECT count(*) AS contador FROM users 
            WHERE users_email = ? AND users_identification = ?;
    `, [ data.users_email, data.users_identification ]);
    const [ userDocumentRol ]: any = await connection.query(`
        SELECT count(*) AS contador FROM users 
            WHERE users_identification = ? AND users_identification_type = ? AND idroles = ?;
    `, [ data.users_identification, data.users_identification_type, data.idroles ]);
    if( userEmail[0].contador !== 0 ){
        return { message: `El DOCUMENTO: ${data.users_identification} con EMAIL: ${data.users_email.toUpperCase()}, ya se encuentra registrado en el sistema.` }
    };
    if( userDocumentRol[0].contador !== 0 ){
        return { message: `El usuario con rol: ${data.idroles} y ${data.users_identification_type}: ${data.users_identification.toUpperCase()}, ya se encuentra registrado en la base de datos.` }
    };
    await connection.query(`
    INSERT INTO users ( idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email, users_providers_paydays, users_providers_expiration_date, users_identification_digital_check )
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
    `, [ data.idroles, data.idsedes, data.users_identification_type, data.users_identification.toUpperCase(), data.users_name.toUpperCase(), data.users_lastname.toUpperCase(), data.users_address.toUpperCase(), data.users_phone, data.users_email.toUpperCase(), data.users_providers_paydays, data.users_providers_expiration_date, digitalCheck ]);
    const [ userCreated ] = await connection.query(`
        SELECT * FROM users WHERE users_identification = ? AND users_identification_type = ? AND idroles = ?;`,
        [ data.users_identification, data.users_identification_type, data.idroles ]
    );
    if (data.users_password){
        const firebase = await auth.createUser(data.users_email, data.users_password);
        return { message: `Usuario con ${ data.users_identification_type }: ${ data.users_identification } y email: ${data.users_email.toUpperCase() }, ha sido creado con éxito`, data: userCreated, firebase}
    };
    return { message: `Usuario con rol: ${ data.idroles } ${ data.users_identification_type }: ${ data.users_identification } y email: ${ data.users_email.toUpperCase() }, ha sido creado con éxito`, data: userCreated}
};

// EDITAR USUARIOS
export const putUsersModel = async ( data: Users ): Promise<{ message: string; data?: Data}> => {
    data.users_lastname === undefined ? data.users_lastname = "" : data.users_lastname;
    data.users_providers_paydays === undefined ? data.users_providers_paydays = null : data.users_providers_paydays;
    data.users_providers_expiration_date === undefined ? data.users_providers_expiration_date = null : data.users_providers_expiration_date;
    const [ validate ] = await connection.query(`
        SELECT count(*) AS contador FROM users WHERE idroles = ? AND users_identification = ? AND users_identification_type = ?;  
        `, [ data.idroles, data.users_identification, data.users_identification_type ]);
    // @ts-ignore
    if (validate[0].contador === 0) {
        return{ message: `El Usuario con rol: ${data.idroles} con ${ data.users_identification_type }: ${data.users_identification}, no se encuentra registrado en la base de datos` }
    };
    await connection.query(`
        UPDATE users SET idroles = ?, idsedes = ?, users_name = ?, users_lastname = ?, users_address = ?, users_phone = ?, users_email = ?, users_providers_paydays = ?, users_providers_expiration_date = ?, users_status = ?
            WHERE users_identification = ? AND users_identification_type = ?;`, 
            [   
                data.idroles,
                data.idsedes,
                data.users_name.toUpperCase(),
                data.users_lastname!.toUpperCase(),
                data.users_address.toUpperCase(),
                data.users_phone,
                data.users_email.toUpperCase(),
                data.users_providers_paydays,
                data.users_providers_expiration_date,
                data.users_status!.toUpperCase(),
                data.users_identification,
                data.users_identification_type 
            ]);
    const [ userInfo ] = await connection.query(`
        SELECT * FROM users WHERE users_identification = ? AND users_identification_type = ?;
    `, [ data.users_identification, data.users_identification_type ]);
    return { message: `Usuario con rol: ${data.idroles} y ${ data.users_identification_type }: ${ data.users_identification } editado correctamente`, data: userInfo};
};

// ELIMINAR USUARIOS
export const deleteUserModel = async (data: UserDocumentRol ): Promise<{ message: string}> => {
    let [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM users WHERE idroles = ? AND users_identification = ? AND users_identification_type = ?;
        `, [ data.idroles, data.users_identification, data.users_identification_type ]);
        // @ts-ignore
        if(parseInt(validate[0].contador) === 0){
            return { message: `El usuario con rol: ${ data.idroles } y ${data.users_identification_type}: ${data.users_identification}, no se encuentra registrado en sistema` };
        };
        await connection.query(`
            DELETE FROM users WHERE idroles = ? AND users_identification = ? AND users_identification_type = ?;
        `, [ data.idroles, data.users_identification, data.users_identification_type ]);
        return { message: `El usuario con rol: ${ data.idroles } y ${ data.users_identification_type }: ${ data.users_identification }, eliminado satisfactoriamente` };
};