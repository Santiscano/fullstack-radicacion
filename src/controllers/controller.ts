import 'dotenv/config';
import { Request, Response } from 'express';
import { modelFucker } from '../models/model';


// Traer una ruta del arvhivo
export const modelFuckers = async ( req: Request, res: Response ) => {
    try {
        const {api_key, Usuario, Casa } = req.body
        const variable = await modelFucker(api_key.req, Usuario.req, Casa.req)
        return res.status(201).json(variable)
    } catch (error) {
        console.log(error)
        return res.status(508).json({ message: "Error del servidor para traer las rutas de los archivos" })
    };
};