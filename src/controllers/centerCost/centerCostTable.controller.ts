import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../../config/database/db';

export const centerCostTable = async(req: Request, res: Response) => {
    const { api_key } = req.headers;
    try {
        if( api_key !== process.env.API_KEY ) return res.status(401).json({ error: true, message: "No cuentas con los permisos para eliminar Areas del centro de costos" });
        const [ data ] = await connection.query(`
            SELECT 
                idcost_center AS id,
                cost_center_area_name AS OP, 
                cost_center_area AS OPERACION, 
                cost_center_subarea_name AS CD, 
                cost_center_subarea AS CEDI, 
                cost_center_name AS DEP,
                cost_center AS DEPENDECIA
                FROM cost_center CC
                    RIGHT JOIN  cost_center_subarea CCS ON CCS.idcost_center_subarea = CC.idcost_center_subarea 
                    RIGHT JOIN cost_center_area CCA ON CCA.idcost_center_area = CCS.idcost_center_area;
        `)
        return res.status(200).json({error: false, message: "SUCCESS", data})
    } catch (error) {
        console.log(error)
        return res.status(512).json({error: true, message: "SERVER_ERROR"})
    };
};