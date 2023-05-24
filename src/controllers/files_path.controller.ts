import { Request, Response } from 'express';
import { missingData } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getFilesPathModel, postFilePathModel, deleteFilePathModel } from '../models/file_path.model';
import { FilePath } from '../interfaces/file_path.interface';

// import postChargeFilePath
import { upload } from '../utilities/PDF/upload/pdfMulter.utilities';
import { postTrakingModel } from '../models/tracking.model';
import { connection } from '../config/database/db';
import moment from 'moment-timezone';


// TRAER LAS RUTAS DE LOS ARCHIVOS
export const getFilesPath = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getFilesPathModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CARGAR Y AGEGAR LA RUTA A LA BASE DE DATOS (PARAMS)
export const postChargeFilePath = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { idfiles, files_path_observation, userSession } = req.params;
    const data = { idfiles, files_path_observation, userSession };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        upload(req, res, async (err) => {
            if ( err ) {
                return res.status(404).send({ message: "Nombre de KEY equivocado para cargar el archivo" });
            }
            if ( req.file ) {
                const path = req.file.path;
                const day = moment.tz(new Date(), "America/Bogota").format();
                await connection.query(`
                    INSERT INTO files_path (idfiles, files_path, files_path_date, files_path_observation) 
                        VALUES (?, ?, ?, ?);
                    `, [ idfiles, path, day, files_path_observation ]);
                const [ filePath ] = await connection.query(`
                    SELECT * FROM files_path WHERE files_path = ?;`, [ path ]);
                postTrakingModel(1, parseInt(idfiles), parseInt(userSession), files_path_observation);
                return res.status(200).json({ error: false, create: filePath, tracking: "Added tracking" });
            };
        });
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR UNA RUTA DE ARCHIVO (RELACIÓN: FILE / FILEPATH)
export const postFilePath = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { idfiles, files_path, files_path_observation, userSession }: FilePath = req.body;
    const data = { idfiles, files_path, files_path_observation, userSession };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        return res.status(200).json(success((await postFilePathModel(data)).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// ELIMINAR LA RUTA DE UN ARCHIVO
export const deleteFilePath = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { idfiles_path } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({idfiles_path}).error) return res.status(422).json(uncompleted(missingData({idfiles_path}).missing));
        return res.status(200).json(success(undefined,(await deleteFilePathModel(idfiles_path)).message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};