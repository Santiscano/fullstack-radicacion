import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Roles } from '../interfaces/roles.interface';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader

export const getAllRegisteredFileModel = async(): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`SELECT files_registered FROM files;`);
    return { data };
};

export const getIdentificationByTypeModel = async( identification: string ): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`SELECT * FROM users WHERE users_identification_type = ? AND idroles = 1`, 
    [ identification.toUpperCase() ]);
    return { data };
};

export const getTypeIdentificationModel = () => {
    const  data = [
        { typeDocument: 'CEDULA CIUDADANIA' }, 
        { typeDocument: 'CEDULA EXTRANJERIA' },
        { typeDocument: 'NIT' },
        { typeDocument: 'PASAPORTE' }, 
        { typeDocument: 'RUT' }
    ];
    return { data };
};

