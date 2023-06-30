import { Request, Response } from 'express';
import fs from "fs";
import path from 'path';
import { missingData } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { errorMessage, success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';

export const deleteBackendDocuments = (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { pathFile } = req.body;
    try {
        if(apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if(missingData({pathFile}).error) return res.status(422).json(uncompleted(missingData({pathFile}).missing));
        const arrayFileName = pathFile.split("/");
        const fileName: string = arrayFileName[arrayFileName.length - 1].trim();
        fs.unlinkSync(path.join(__dirname, `../../temp/${fileName}`));
        return res.status(200).json(success(undefined, "Archivo eliminado con éxito"));
    } catch (error) {
        return res.status(417).json(errorMessage("¡No existe el documento!"));
    }
}