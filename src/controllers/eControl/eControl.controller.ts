import { Request, Response } from 'express';
import { apiKeyValidate } from '../../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../../utilities/responses.utilities';
import {eControlOperativoModel } from '../../models/eControl.model';
import { missingData } from '../../utilities/missingData.utilities';
import { eControl } from '../../interfaces/eControl.interface';
import { Logs, writeLog } from '../../utilities/logs.utilities';



// CONEXIÓN OPERATIVA ECONTROL / GESTIÓN ADMINISTRATIVA
export const eControlOperativo = async (req: Request, res: Response) =>{
    const { api_key } = req.headers;
    const { users_identification_type, users_identification, files_price, files_cost_center, files_code_accounting, files_account_type, files_account_type_number, pdfPurchaseOrder, pdfElectronicBill } = req.body;
    const data: eControl = { users_identification_type, users_identification, files_price, files_cost_center, files_code_accounting, files_account_type, files_account_type_number, pdfPurchaseOrder, pdfElectronicBill };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingData(data).error) return res.status(422).json(uncompleted(missingData(data).missing));
        const info = await eControlOperativoModel(data);
        const log: Logs = {
            fileName: "e-control",
            error: info.error,
            files_account_type_number,
            files_cost_center,
            files_code_accounting,
            users_identification_type,
            users_identification,
            message: info.message
        };
        writeLog(log);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};
