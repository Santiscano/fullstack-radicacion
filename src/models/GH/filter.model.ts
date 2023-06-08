import 'dotenv/config'
import { connection } from '../../config/database/db';
import type Data from '../../interfaces/DataSql2.interface';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

export const employeeFilterModel = async (data: string): Promise<{data:Data}> => {
    const employee = `%${data}%`;
    const [ response ] = await connection.query(`
        SELECT * FROM users 
            WHERE idroles = 11 AND users_identification LIKE ? OR users_name LIKE ? OR users_lastname LIKE ? OR CONCAT(users_name, " " , users_lastname) LIKE ?;`, 
        [employee, employee, employee, employee]);
    return { data: response };
};