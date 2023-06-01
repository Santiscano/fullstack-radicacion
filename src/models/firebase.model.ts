import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Roles } from '../interfaces/roles.interface';


type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 

export const logInModel = async (email: string): Promise<{data:Data}> => {
    const [ validate ] = await connection.query(`SELECT users_status FROM users WHERE users_email = ?;`, [ email ]);
    return {data: validate}
};


export const validateUserModel = async (emailToken: string): Promise<{message?:string, data?: Data}> => {
    const [ result ]: any = await connection.query(`
            SELECT U.idusers, U.idroles, U.idsedes, U.users_identification_type, U.users_identification, U.users_name, U.users_lastname, U.users_email, U.users_status, 
                R.roles, 
                S.sedes_city, 
                S.sedes_name 
                    FROM users U 
                    LEFT JOIN roles R ON U.idroles = R.idroles 
                    LEFT JOIN sedes S ON U.idsedes = S.idsedes 
                    WHERE U.users_status = 'ACTIVO' AND U.users_email = ? AND U.idroles <> 1;`, [ emailToken ]);
        if(result.length === 0){
            return { message: `El email: ${emailToken} se encuentra registrado en Firebase, pero no existe en el sistema`};
        };
        return {data: result[0]};
}