import fs from 'fs-extra';
import path from 'path';
import { Request, Response } from 'express';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import {eControlOperativoModel } from '../../models/eControl.model';
import { missingData } from '../../utilities/missingData.utilities';



// CONEXIÓN OPERATIVA ECONTROL / GESTIÓN ADMINISTRATIVA
export const eControlOperativo = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    const { pdfBase64 } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData({pdfBase64}).error) return res.status(422).json(uncompleted(missingData({pdfBase64}).missing));
        await eControlOperativoModel(pdfBase64);
        return res.status(200).json("SE CARGO ?");
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
