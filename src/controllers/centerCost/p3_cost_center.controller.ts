import { Request, Response } from "express";
import {connection} from '../../config/database/db';
import { nullValidator } from "../../utilities/nullValidator";
import { twoCharactersValidator } from '../../utilities/twoCharactersValidator';

// Traer los Centros de costo
export const getCostCenter = async (req: Request, res: Response) => {
    const { api_key } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        const [ data ] = await connection.query(`
            SELECT idcost_center AS id, 
                    idcost_center_subarea AS fk, 
                    cost_center AS number, 
                    cost_center_name AS name 
                        FROM cost_center ORDER BY cost_center ASC;`);
        return res.status(200).json({ error: false, data });
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor al traer los centros de costo" });
    };
};

// Traer los Centros de costo
export const getCostCenterById = async (req: Request, res: Response) => {
    const { api_key, idcost_center_subarea } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        if( nullValidator([ idcost_center_subarea ]) ){
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        const [ data ] = await connection.query(`
            SELECT idcost_center AS id, 
                    idcost_center_subarea AS fk, 
                    cost_center AS number, 
                    cost_center_name AS name 
                        FROM cost_center WHERE idcost_center_subarea = ? ORDER BY cost_center ASC;`, [ idcost_center_subarea ]);
        //@ts-ignore
        if ( data.length === 0 ) {
            return res.status(203).json({ error: true, message: `La Sub Area con id: ${idcost_center_subarea}, no se encuentra registrada en el sistema`  })
        };
        return res.status(200).json({ error: false, data });
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor al traer los centros de costo" });
    };
};

// Crear Centro de costo
export const postCostCenter = async (req: Request, res: Response) => {
    const { idcost_center_subarea, cost_center, cost_center_name } = req.body;
    const values: string[] = [ idcost_center_subarea, cost_center, cost_center_name ];
    try {
        if( nullValidator(values) ){
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        const data = twoCharactersValidator(cost_center)
        const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM cost_center WHERE cost_center = ? AND idcost_center_subarea = ?;`,
                [ data, idcost_center_subarea ]);
        // @ts-ignore
        if( validate[0].contador !== 0 || data === 'INVALID_VALUED' ) {
            return res.status(201).json({ error: true, message: `Centro de costos: ${ data } es invalido o ya se encuentra registrada en la Base de Datos`});
        };
        await connection.query(`
            INSERT INTO cost_center (idcost_center_subarea, cost_center, cost_center_name)
                VALUES ( ?, ?, ? );
        `, [ idcost_center_subarea, data, cost_center_name.toUpperCase() ]);
        const [ costCenter ] = await connection.query(`SELECT * FROM cost_center WHERE cost_center = ?`,
            [data])
        return res.status(200).json({ error: false, created: "Centro de costos creada satisfactoriamente", costCenter });
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para crear un centro de costos" });
    };
};

// Eliminar centro de costo
export const deleteCostCenter = async (req: Request, res: Response) => {
    const { api_key, cost_center } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ message: "No cuentas con los permisos para eliminar el centro de costos" });
        };
        if( nullValidator([cost_center]) ){
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        const data = twoCharactersValidator(cost_center);
        const [ validate ] = await connection.query(`
                SELECT count(*) AS contador FROM cost_center WHERE cost_center = ?;`,
            [ data ]);
            //@ts-ignore
            if (!validate[0].contador || data === 'INVALID_VALUED') {
                return res.status(201).json({ error: true, message: `Centro costo: ${ data }, no se encuentra registrado en la base de datos` });
            };
            await connection.query(`
                DELETE FROM cost_center WHERE cost_center = ?;`,
                [ data ]);
            return res.status(200).json({ error: false, message: `Cetro de costos: ${ data }, eliminada satisfactoriamente` })
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar el centro de costos" })
    };
};
