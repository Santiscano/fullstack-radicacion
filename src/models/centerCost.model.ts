import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { CenterCostArea } from '../interfaces/centerCost.interface';
import { twoCharactersValidator } from '../utilities/twoCharactersValidator';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader

export const centerCostTableModel = async(): Promise<{data: Data}> => {
    const [ data ] = await connection.query(`
        SELECT 
            idcost_center AS id,
            cost_center_area_name AS OP, 
            cost_center_area AS OPERACION, 
            cost_center_subarea_name AS CD, 
            cost_center_subarea AS CEDI, 
            cost_center_name AS DEP,
            cost_center AS DEPENDENCIA
            FROM cost_center CC
                RIGHT JOIN  cost_center_subarea CCS ON CCS.idcost_center_subarea = CC.idcost_center_subarea 
                RIGHT JOIN cost_center_area CCA ON CCA.idcost_center_area = CCS.idcost_center_area;
    `)
    return {data};
};

/**
 * AREA
 * @returns 
 */

// TRAER AREA CENTRO DE COSTOS (OPERACIÓN)
export const getCostAreaModel = async (): Promise<{ data: Data }> => {
    const [ data ] = await connection.query('SELECT idcost_center_area AS id, cost_center_area AS number, cost_center_area_name AS name FROM cost_center_area ORDER BY cost_center_area ASC; ');
    return {data};
};

// CREAR AREA CENTRO DE COSTOS (OPERACIÓN)
export const postCostAreaModel = async(data: CenterCostArea): Promise<{message?:string, data?:Data}> => {
    const twoValidate = twoCharactersValidator(data.cost_center_area);
    const [ validate ]: any = await connection.query(`
        SELECT count(*) AS contador FROM cost_center_area WHERE cost_center_area = ?;`,
            [ twoValidate ]);
    if( twoValidate === "INVALID_VALUED" || validate[0].contador !== 0 ) {
        return { message: "La OPERACIÓN no es valida o ya se encuentra registrada en el sistema" };
    };
    await connection.query(`
        INSERT INTO cost_center_area (cost_center_area, cost_center_area_name)
            VALUES (?, ?);
    `, [ twoValidate, data.cost_center_area_name.toUpperCase() ]);
    const [ costArea ] = await connection.query(`SELECT * FROM cost_center_area WHERE cost_center_area = ?`,
        [ twoValidate ])
    return { message: `OPERACIÓN: ${twoValidate}, ${data.cost_center_area_name.toUpperCase()} creada con éxito`, data: costArea };
};

// ELIMINIAR AREA CENTRO DE COSTOS (OPERACIÓN) / ¿ELIMINAR LAS FK?
export const deleteCostAreaModel = async(data: number): Promise<{message:string}> => {
    const twoValidate = twoCharactersValidator(data);
    const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM cost_center_area WHERE cost_center_area = ?;`,
        [ twoValidate ]);
    //@ts-ignore
    if (!validate[0].contador) {
        return { message: `El area de costo: ${ twoValidate } es invalido o no se encuentra registrado en la base de datos` };
    };
    await connection.query(`
        DELETE FROM cost_center_area WHERE cost_center_area = ?;`,
        [ twoValidate ]);
    return { message: `OPERACIÓN: ${ twoValidate }, eliminada con éxito` };
};