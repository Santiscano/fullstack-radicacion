import 'dotenv/config';
import { Request, Response } from 'express';
import { modelFucker } from '../models/model';
import { missingData, missingDataObject } from '../utilities/missingData.utilities';
import { success, unsuccessfully, unauthorized, uncompleted } from "../utilities/responses.utilities";

// Traer una ruta del arvhivo
export const modelFuckers = async ( req: Request, res: Response ) => {
    try {
        const { api_key } = req.headers;
        const { Usuario, Trabajo } = req.body;
        const values = { Usuario, Trabajo }
        const prueba = missingDataObject(values).missing
        api_key !== process.env.API_KEY
            ? res.status(401).json(unauthorized())
            : missingDataObject(values).error
            ? res.status(422).json(uncompleted(prueba))
            : res.status(200).json("Melani")
        // const variable = await modelFucker()
        // return res.status(201).json(variable)
    } catch (error) {
        console.log(error)
        return res.status(508).json({ message: "Error del servidor para traer las rutas de los archivos" })
    };
};