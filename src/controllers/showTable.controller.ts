import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { missingData } from '../utilities/missingData.utilities';


export const showTable = async ( req: Request, res: Response ) => {
    const { api_key } = req.body;
    try {
        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información"});
        };
        const [ dataInfo ] = await connection.query(`
        SELECT * FROM ShowTable;`);
            // console.log(dataInfo)
        return res.status(200).json({dataInfo});
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: `Error del servidor para mostrar la tabla de autorización` });
    };
};

export const pendingTable = async (req: Request, res: Response) => {
    const { api_key, idusers } = req.body;
    try {
        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ message: "No cuentas con los permisos para acceder a esta información"});
        };
        if (missingData([idusers])){
            return res.status(400).json({ message: "ERROR_MISSING_VALUES" });
        };
        const [ dataInfo ] = await connection.query(`
        SELECT * FROM ShowTable WHERE idusers = ?`, [ idusers ]);
        return res.status(200).json({ dataInfo });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({error: true, message: "Error del servidor para mostrar la tabla de pendientes"})
    };
};