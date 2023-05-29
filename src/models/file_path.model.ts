import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { upload } from '../utilities/PDF/upload/pdfMulter.utilities';
import { postTrakingModel } from '../models/tracking.model';
import { FilePath, FilePathUpload } from '../interfaces/file_path.interface';
import moment from 'moment-timezone';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader

export const getFilesPathModel = async (): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`SELECT * FROM files_path;`);
    return { data };
};

// CREAR UNA RUTA DEL ARCHIVO
export const postFilePathModel = async (data: FilePath): Promise<{data?: Data}> => {
    const idfiles_states = 2;                         // ESTADO ARCHIVO CARGADO
    const day = moment.tz(new Date(), "America/Bogota").format();
    await connection.query(`
        INSERT INTO files_path (idfiles, files_path, files_path_date, files_path_observation) 
            VALUES (?, ?, ?, ?);
        `, [ data.idfiles, data.files_path, day, data.files_path_observation.toUpperCase() ]);
    const [ filePath ] = await connection.query(`
        SELECT * FROM files_path WHERE files_path = ?;`, [ data.files_path ]);
    postTrakingModel(idfiles_states, data.idfiles, data.userSession, data.files_path_observation.toUpperCase());
    return { data: filePath };
};

// ELIMINAR UNA RUTA DEL ARCHIVO
export const deleteFilePathModel = async (data: number): Promise<{message:string}> => {
    const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM files_path WHERE idfiles_path = ?;`,
            [ data ]);
    //@ts-ignore
    if ( validate[0].contador === 0 ) {
        return { message: `La ruta con id: ${ data }, no se cuentra registrtada en el sistema` };
    };
    await connection.query(`
        DELETE FROM files_path WHERE idfiles_path = ?;`, [ data ]);
    return { message: `Ruta de archivo con id: ${ data }, eliminada con éxito` };
};