import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Roles } from '../interfaces/roles.interface';
import { countTable, getAllTable } from '../utilities/countTable.utilities';
import { getTableRow } from '../utilities/countTable.utilities';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader

// TRAER TODOS LOS RADICADOS (SOLO RADICADO)
export const getAllRegisteredFileModel = async(): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`SELECT files_registered FROM files ORDER BY idfiles ASC;`);
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
    const [ path ] = await connection.query(`
        SELECT * FROM files_path WHERE idfiles = ?;
        `,[ file ]);
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
};

export const actionFilterModel = async (data: number): Promise<{ message?:string, data?: {stateFile: string;}[] }> => {
    if(await countTable("roles", "idroles", data) === 0) return {message: `Numero de ROL: ${data}, no esxiste en el sistema`};
    const [ rolInfo ]: any = await getTableRow("roles", "idroles", data);
    const [ stateInfo ]: any = await connection.query(`SELECT * FROM files_states`);
    if(rolInfo.roles_description === "AUDITOR") {
        return { data: 
            [
                {stateFile: stateInfo[2] },
                {stateFile: stateInfo[6] },
                {stateFile: stateInfo[7] },
                {stateFile: stateInfo[8] },
                {stateFile: stateInfo[9] },
                {stateFile: stateInfo[11] },
            ]
        }
    }
    if(rolInfo.roles_description === "GERENCIA") {
        return { data: 
            [
                {stateFile: stateInfo[3] },
                {stateFile: stateInfo[6] },
                {stateFile: stateInfo[7] },
                {stateFile: stateInfo[8] },
                {stateFile: stateInfo[9] },
                {stateFile: stateInfo[10] },
            ]
        }
    };
    if(rolInfo.roles_description === "CONTABILIDAD") {
        return { data: 
            [
                {stateFile: stateInfo[4] },
                {stateFile: stateInfo[6] },
                {stateFile: stateInfo[7] },
                {stateFile: stateInfo[8] },
                {stateFile: stateInfo[9] },
                {stateFile: stateInfo[10] },
            ]
        }
    };
    if(rolInfo.roles_description === "TESORERIA") {
        return { data: 
            [
                {stateFile: stateInfo[5] },
                {stateFile: stateInfo[6] },
                {stateFile: stateInfo[7] },
                {stateFile: stateInfo[8] },
                {stateFile: stateInfo[9] },
                {stateFile: stateInfo[10] },
            ]
        }
    };
    
    return {message: "No cuentas con un rol apto para esta función" }
};