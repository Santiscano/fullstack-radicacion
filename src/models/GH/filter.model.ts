import 'dotenv/config'
import { connection } from '../../config/database/db';
import type Data from '../../interfaces/DataSql2.interface';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

export const employeeFilterModel = async (data: string): Promise<{data:Data}> => {
    const employee = `%${data}%`;
    const [ response ] = await connection.query(`
    SELECT * FROM users U
        LEFT JOIN roles R ON U.idroles = R.idroles
        LEFT JOIN sedes S ON U.idsedes = S.idsedes 
            WHERE U.idroles = 11 AND U.users_identification LIKE ? OR U.users_name LIKE ? OR U.users_lastname LIKE ? OR CONCAT(U.users_name, " " , U.users_lastname) LIKE ?;`, 
        [employee, employee, employee, employee]);
    return { data: response };
};