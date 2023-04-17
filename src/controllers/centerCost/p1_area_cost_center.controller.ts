import { Request, Response } from "express";
import {connection} from '../../config/database/db';
import { nullValidator } from "../../utilities/nullValidator";
import { twoCharactersValidator } from '../../utilities/twoCharactersValidator';

// Traer los Areas de Costo
export const getCostArea = async (req: Request, res: Response) => {
    const { api_key } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        const [ data ] = await connection.query('SELECT idcost_center_area AS id, cost_center_area AS number, cost_center_area_name AS name FROM cost_center_area ORDER BY cost_center_area ASC; ');
        return res.status(200).json({ error: true, data });
    } catch (error) {
        console.log(error);
        return res.status(508).json({error: true, message: "Error del servidor al traer Areas de los centros de costo"});
    };
};

// Crear Areas de Costo
export const postCostArea = async (req: Request, res: Response) => {
    const { cost_center_area, cost_center_area_name } = req.body;
    const values: string[] = [cost_center_area, cost_center_area_name]; 
    try {
        if ( nullValidator(values) ) {
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        let data = twoCharactersValidator(cost_center_area);
        const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM cost_center_area WHERE cost_center_area = ?;`,
                [ data ]);
        // @ts-ignore
        if( data === "INVALID_VALUED" || validate[0].contador !== 0 ) {
            return res.status(201).json({ error: true, message: "Area del centro de costos no es valido o ya se encuentra registrada en la Base de Datos"});
        };
        await connection.query(`
            INSERT INTO cost_center_area (cost_center_area, cost_center_area_name)
                VALUES (?, ?);
        `, [ data, cost_center_area_name.toUpperCase() ]);
        const [ costArea ] = await connection.query(`SELECT * FROM cost_center_area WHERE cost_center_area = ?`,
            [data])
        return res.status(200).json({ error: false, message: "Area del centro de costos creada satisfactoriamente", costArea });
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para crear una Area del centro de costos" });
    };
};

// Eliminar las Areas de Costo (FALTA VALIDAR LAS FK)
export const deleteCostArea = async (req: Request, res: Response) => {
    const { api_key, cost_center_area } = req.body;
    try {
        if ( api_key !== process.env.API_KEY ) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para eliminar Areas del centro de costos" });
        };
        if (nullValidator([cost_center_area])) {
            return res.status(422).json({ error: true, message: "MISSING_VALUES" });
        };
        const data = twoCharactersValidator(cost_center_area);
        const [ validate ] = await connection.query(`
                SELECT count(*) AS contador FROM cost_center_area WHERE cost_center_area = ?;`,
            [ data ]);
        //@ts-ignore
        if (!validate[0].contador) {
            return res.status(200).json({ error: true, message: `El area de costo: ${ data } es invalido o no se encuentra registrado en la base de datos` });
        };
        await connection.query(`
            DELETE FROM cost_center_area WHERE cost_center_area = ?;`,
            [ data ]);
        return res.status(200).json({ error: true, message: `Area del cetro de costos: ${ data }, eliminada satisfactoriamente` })
    } catch (error) {
        console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar el Area del centro de costos" })
    };
};

