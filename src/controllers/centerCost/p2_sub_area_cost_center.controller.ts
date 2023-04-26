import { Request, Response } from "express";
import {connection} from '../../config/database/db';
import { missingData } from "../../utilities/missingData.utilities";
import { twoCharactersValidator } from '../../utilities/twoCharactersValidator';

// Traer los Areas de Costo
export const getCostSubArea = async (req: Request, res: Response) => {
    const { api_key } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        const [ data ] = await connection.query(`
            SELECT idcost_center_subarea AS id, 
                    idcost_center_area AS fk, 
                    cost_center_subarea AS number, 
                    cost_center_subarea_name AS name 
                        FROM cost_center_subarea ORDER BY cost_center_subarea ASC;`);
        return res.status(200).json({ error: false, data });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor al traer Sub Areas de los centros de costo" });
    };
};

// Traer los Areas de Costo
export const getCostSubAreaById = async (req: Request, res: Response) => {
    const { api_key, idcost_center_area } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        // if( missingData([idcost_center_area]) ){
        //     return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        // };
        const [ data ] = await connection.query(`
            SELECT idcost_center_subarea AS id, 
                    idcost_center_area AS fk, 
                    cost_center_subarea AS number, 
                    cost_center_subarea_name AS name 
                        FROM cost_center_subarea WHERE idcost_center_area = ? ORDER BY cost_center_subarea ASC;`, [ idcost_center_area ]);
        //@ts-ignore
        if ( data.length === 0 ) {
            return res.status(203).json({ error: true, message: `La Area con id: ${ idcost_center_area }, no se encuentra registrada en el sistema` });
        };
        return res.status(200).json({ error: false, data });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor al traer Sub Areas de los centros de costo" });
    };
};

// Crear Sub Areas de Costo
export const postCostSubArea = async (req: Request, res: Response) => {
    const { idcost_center_area, cost_center_subarea, cost_center_subarea_name } = req.body;
    const values: string[] = [ idcost_center_area, cost_center_subarea, cost_center_subarea_name ];
    try {
        if( missingData(values) ){
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        const data = twoCharactersValidator(cost_center_subarea)
        const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM cost_center_subarea WHERE cost_center_subarea = ? AND idcost_center_area = ?;`,
            [ data, idcost_center_area ]);
        // @ts-ignore
        if( validate[0].contador !== 0 || data === 'INVALID_VALUED' ) {
            return res.status(201).json({ error: true, message: `Sub Area del centro de costos: ${data} no es valido o ya se encuentra registrada en la Base de Datos`});
        };
        await connection.query(`
        INSERT INTO cost_center_subarea (idcost_center_area, cost_center_subarea, cost_center_subarea_name)
        VALUES ( ?, ?, ? );
        `, [ idcost_center_area, data, cost_center_subarea_name.toUpperCase() ]);
        const [ costSubArea ] = await connection.query(`SELECT * FROM cost_center_subarea WHERE cost_center_subarea = ?`,
            [data])
        return res.status(200).json({ error: false, created: "Sub Area del centro de costos creada satisfactoriamente", costSubArea });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para crear una Sub Area del centro de costos" });
    };
};

// Eliminar las Areas de Costo ( FALTA VALIDAR LAS FK)
export const deleteCostSubArea = async (req: Request, res: Response) => {
    const { api_key, cost_center_subarea } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para eliminar Sub Areas del centro de costos" });
        };
        if (missingData([cost_center_subarea])) {
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        const data = twoCharactersValidator(cost_center_subarea);
        const [ validate ] = await connection.query(`
                SELECT count(*) AS contador FROM cost_center_subarea WHERE cost_center_subarea = ?;`,
            [ data ]);
        //@ts-ignore
        if (!validate[0].contador ) {
            return res.status(200).json({ error: true, message: `La sub area de costo: ${ data }, no se encuentra registrado en la base de datos` });
        };
        await connection.query(`
            DELETE FROM cost_center_subarea WHERE cost_center_subarea = ?;`,
            [ data ]);
        return res.status(200).json({ error: false, deleted: `Sub Area del cetro de costos: ${ data }, eliminada satisfactoriamente` });
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar el Sub Area del centro de costos" })
    };
};
