import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { File } from '../interfaces/files.interface';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader


export const getFilesModel = async(): Promise<{data: Data}> => {
    const [ data ] = await connection.query('SELECT * FROM files;');
    return { data }
};

export const postFileModel = async(data: File): Promise<{message?: string, data?: Data}> => {
    const idfiles_states = 1;                     // ESTADO ASIGNADO
    const tracking_observation = `INICIO DEL PROCESO DEL ${data.files_registered} EXITOSO`;
    const [ registeredVal ] = await connection.query(`
                SELECT count(*) AS contador FROM files WHERE files_registered = ?;`,
            [ data.files_registered ]);
        const [ filesAccountVal ] = await connection.query(`
                SELECT count(*) AS contador FROM files WHERE files_account_type = ? AND files_account_type_number = ?;`,
            [ data.files_account_type, data.files_account_type_number ]);
        //@ts-ignore
        if (registeredVal[0].contador !== 0){
            return { message: `Radicado: ${data.files_registered.toUpperCase()}, ya se encuentra creado en la base de datos`};
        };
        //@ts-ignore
        if (filesAccountVal[0].contador !== 0){
            return {  message: `${ data.files_account_type.toUpperCase() }: ${ data.files_account_type_number.toUpperCase() }, ya se encuentra creado en la base de datos`};
        };
        await connection.query(`
            INSERT INTO files (idproviders, idsedes, idusers, files_type, files_registered, files_price, files_account_type, files_account_type_number)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, 
                [ 
                    data.idproviders, 
                    data.idsedes, 
                    data.idusers, 
                    data.files_type, 
                    data.files_registered.toUpperCase(),
                    data.files_price,
                    data.files_account_type.toUpperCase(), 
                    data.files_account_type_number.toUpperCase() 
                ]);
        const [ file ] = await connection.query('SELECT * FROM files WHERE files_registered = ?;', [ data.files_registered ]);
        //@ts-ignore
        postTrakingModel(idfiles_states, file[0].idfiles, userSession, tracking_observation);
        // CREAR PDF RADICADO
        // createPDF(files_registered.toUpperCase(), files_account_type.toUpperCase(), files_type.toUpperCase());
        return { message: "Cargado exitosamente", data: file };
};