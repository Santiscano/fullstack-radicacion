import { Request, Response } from 'express';
import { missingDataObject } from '../utilities/missingData.utilities';
import { success, unsuccessfully, unauthorized, uncompleted } from '../utilities/responses.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { showTableModel } from '../models/showTable.model';


export const showTable = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    try {
<<<<<<< HEAD
        console.log(api_key)
        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información"});
        };
        const [ dataInfo ] = await connection.query(`
        SELECT * FROM ShowTable;`);
            // console.log(dataInfo)
        return res.status(200).json({dataInfo});
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: `Error del servidor para mostrar la tabla de autorización` });
=======
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await showTableModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
>>>>>>> 18db29e5cd691572f6a5e5440718bbb43dc72d6a
    };
};

export const pendingTable = async (req: Request, res: Response) => {
    const { api_key } = req.headers;
    const { idusers } = req.body;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject({idusers}).error) return res.status(422).json(uncompleted(missingDataObject({idusers}).missing));
        return res.status(200).json(success((await showTableModel(idusers)).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};