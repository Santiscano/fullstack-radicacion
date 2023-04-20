import  "dotenv/config";
import fs from 'fs';
import { Request, Response } from 'express';
import { upload } from '../../helpers/multerAddPdf';
import { uploadFile } from '../../config/gcp/storage';
import { connection } from '../../config/database/db';
import { editPDF } from '../../utilities/PDF/editPDF';


export const uploadFileDocument = async (req: Request, res: Response) => {
    const { idfiles } = req.params;
    try {
        const [ file ] = await connection.query(`SELECT * FROM files WHERE idfiles = ?`, [idfiles]);
        //@ts-ignore
        if( file[0] === 0 ){
            return res.status(401).json({error:true, message: `El idfiles: ${idfiles}, no se encuentra registrado en el sistema` });
        };
        const [ filePathCount ] = await connection.query(`SELECT count(*) AS contador FROM files_path WHERE idfiles = ?;`, idfiles); 

        upload(req, res, async (err) => {
            if (err) {
                // console.log(err);
                return res.send({error: true, message: "FILE_UPLOAD_FAILED"});
            };
            if( req.file ) {
                let ruta = req.file.filename;
                //@ts-ignore
                let destino = `${file[0].files_registered}-${filePathCount[0].contador + 1}`;                   //Nombre del archivo en el Bucket
                let pathPDF: string = req.file.path;
                //@ts-ignore
                await editPDF(pathPDF, pathPDF, destino);
                
                // await editPDF(pathPDF, pathPDF, destino, file[0].files_account_type);
                const pathFile = `https://storage.cloud.google.com/${process.env.BUCKET_NAME}/radicacion/administrativo/${destino}.pdf?authuser=3`
                await uploadFile(ruta, `${process.env.BUCKET_ASSIGN}/administrativo/${destino}.pdf`);
                fs.unlinkSync(pathPDF);                            // Eliminar el archivo del servidor
                return res.status(201).json({error: false, fileName: destino, pathFile, message: `Archivo cargado satisfactoriamente al bucker y almacenado en la base de datos`});
            };
        });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({error: true, message: "SERVER_ERROR"})
    };
};