import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Roles } from '../interfaces/roles.interface';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader

// TRAER TODOS LOS RADICADOS (SOLO RADICADO)
export const getAllRegisteredFileModel = async(): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`SELECT files_registered FROM files;`);
    return { data };
};

// TRAER LOS USUARIOS (PROVEEDOR) SEGÚN EL TIPO DE DOCUMENTO
export const getIdentificationByTypeModel = async ( identification: string ): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`SELECT * FROM users WHERE users_identification_type = ? AND idroles = 1`, 
    [ identification.toUpperCase() ]);
    return { data };
};

// TRAER LOS TIPOS DE DOCUMENTOS
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

// FILTRO DE ARCHIVOS Y RUTAS, SEGÚN RADICADO
export const registeredFilterModel = async(data: string): Promise<{message?:string, data?: Data, path: Data}> => {
    const [ dataInfo ] = await connection.query(`
        SELECT * FROM ShowTable
                WHERE files_registered = ?;`, data );
    //@ts-ignore
    if ( dataInfo.length === 0 ) return { message: `No se ha encontado información adjunta al RADICADO: ${ data }`}
    //@ts-ignore
    const file = dataInfo[0].idfiles
    console.log(file);
    const [ path ] = await connection.query(`
        SELECT * FROM files_path WHERE idfiles = ?;
        `,[ file ]);
        console.log(path);
    return { data: dataInfo, path };
};

// FILTRO DE ARCHIVOS Y RUTAS, SEGÚN TIPO Y NUMERO DE CUENTA
export const accountTypeFilterModel = async (data: {files_account_type: string, files_account_type_number: string}): Promise<{message?: string, data?: Data, path?: Data}> => {
    const [ response ] = await connection.query(`
        SELECT * FROM ShowTable
            WHERE files_account_type = ? AND files_account_type_number = ?;`,
            [ data.files_account_type, data.files_account_type_number]);
    //@ts-ignore
    if ( response.length === 0 ){
        return { message: `No se ha encontado información adjunta a ${data.files_account_type}: ${data.files_account_type_number}`};
    };
    //@ts-ignore
    const file = response[0].idfiles
    const [ path ] = await connection.query(`
        SELECT * FROM files_path WHERE idfiles = ?;`, [ file ]);
    return { data: response, path };
}