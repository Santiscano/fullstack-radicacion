import "dotenv/config";
import fs from 'fs';
import { Request, Response } from 'express';
import { upload } from '../../utilities/PDF/upload/pdfMulter.utilities';
import { uploadFile } from '../../config/gcp/storage';
import { connection } from '../../config/database/db';
import { editPDF } from '../../utilities/PDF/editPDF';
import { success, unauthorized, unsuccessfully } from "../../utilities/responses.utilities";
import { apiKeyValidate } from "../../utilities/apiKeyValidate.utilities";


// CARGAR UN PDF AL BUCKET DE GOOGLE
export const uploadFileDocument = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idfiles, files_type } = req.params;
    const message = `Archivo cargado satisfactoriamente al bucker y almacenado en la base de datos`
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        const [ file ]: any = await connection.query(`SELECT * FROM files WHERE idfiles = ?`, [idfiles]);
        if( file[0] === 0 ){
            return res.status(404).json({ error: true, message: `El idfiles: ${idfiles}, no se encuentra registrado en el sistema` });
        };
        const [ filePathCount ]: any = await connection.query(`SELECT count(*) AS contador FROM files_path WHERE idfiles = ?;`, idfiles); 
        upload(req, res, async (error) => {
            if (error) return res.send({error: true, message: "FILE_UPLOAD_FAILED"});
            if (req.file) {
                const partes: string[] = req.file.originalname.split(".");
                const extension: string = partes[partes.length - 1].trim();
                const ruta: string = req.file.filename;
                // NOMBRE DEL ARCHIVO EN EL BUCKET
                const destino: string = `${file[0].files_registered}-${filePathCount[0].contador + 1}`;
                const pathPDF: string = req.file.path;
                const pathFile: string = `https://storage.cloud.google.com/${process.env.BUCKET_NAME}/${process.env.BUCKET_ASSIGN}/${files_type}/${destino}.${extension}?authuser=3`
                // EDITAR PDF (AGREGAR RADICADO)
                await editPDF(pathPDF, pathPDF, destino);
                // CARGAR EL PDF AL BUCKET
                await uploadFile(ruta, `${process.env.BUCKET_ASSIGN}/${files_type}/${destino}.${extension}`);
                // ELIMINAR ARCHIVO DEL SERVIDOR
                fs.unlinkSync(pathPDF);
                return res.status(200).json({error: false, fileName: destino, pathFile, message});
            };
            return res.status(202).json({error: false, message: "No has cargado ningún documento"}); 
        });
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};