import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { File, PutFile } from '../interfaces/files.interface';
import { postTrakingModel } from '../models/tracking.model';

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
        postTrakingModel(idfiles_states, file[0].idfiles, data.userSession, tracking_observation);
        // CREAR PDF RADICADO
        // createPDF(files_registered.toUpperCase(), files_account_type.toUpperCase(), files_type.toUpperCase());
        return { message: "Cargado exitosamente", data: file };
};

export const putFileModel = async( data: PutFile ): Promise<{ message?: string, data?: Data }>  => {
    const [ validate ] = await connection.query(`SELECT count(*) AS contador FROM files WHERE idfiles = ? OR files_registered = ?;`,
        [ data.idfiles, data.files_registered ]);
    // @ts-ignore
    if ( validate[0].contador === 0 ) {
        return { message: `Archivo con el id: ${ data.idfiles } o radicado: ${ data.files_registered }, no se encuentra registrado en la base de datos` }
    };
    await connection.query(`
        UPDATE files SET
            idproviders = ?, 
            idusers = ?, 
            idfiles_states = ?, 
            files_type = ?,
            files_cost_center = ?, 
            files_code_accounting = ?, 
            files_code_treasury = ?, 
            files_price = ?,
            files_account_type = ?, 
            files_account_type_number = ?
                WHERE idfiles = ? OR files_registered = ?;`,
            [ 
                data.idproviders,
                data.idusers,
                data.idfiles_states,
                data.files_type,
                data.files_cost_center,
                data.files_code_accounting,
                data.files_code_treasury,
                data.files_price, 
                data.files_account_type.toUpperCase(), 
                data.files_account_type_number.toUpperCase(), 
                data.idfiles, 
                data.files_registered 
            ]);
    const [ fileUpdated ] = await connection.query(`
        SELECT * FROM files WHERE idfiles = ? OR files_registered = ?;`,
        [ data.idfiles, data.files_registered ]);
    postTrakingModel(data.idfiles_states, data.idfiles, data.userSession, data.tracking_observation.toUpperCase());
    return { message: `RADICADO: ${data.files_registered}, modificado con éxito`, data: fileUpdated };
};

export const deleteFileModel = async (data: number): Promise<{message: string}> => {
    const [ info ] = await connection.query(`SELECT idfiles FROM files WHERE files_registered = ?;`, data );
    //@ts-ignore
    if( info[0] === undefined ) {
        return { message: `RADICADO: ${data}, no existe en el sistema`};
    };
    //@ts-ignore
    const idfiles = info[0].idfiles;
    await connection.query(`DELETE FROM tracking WHERE idfiles = ?;`, [ idfiles ]);
    // console.log("Eliminado del tracking");
    await connection.query(`DELETE FROM files_path WHERE idfiles = ?;`, [ idfiles ])
    // console.log("Eliminado de las rutas");
    await connection.query(`DELETE FROM files WHERE idfiles = ?;`, [ idfiles ]);
    // console.log("Eliminado del los archivos");
    return { message: `RADICADO: ${ data }, eliminado con éxito`};
}