import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { CenterCostArea, CenterCostSubArea, CenterCost } from '../interfaces/centerCost.interface';
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
 * CENTRO DE COSTOS / AREA (OPERACIÓN)
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
    if (validate[0].contador === 0) {
        return { message: `OPERACIÓN: ${ twoValidate } es invalido o no se encuentra registrado en la base de datos` };
    };
    await connection.query(`
        DELETE FROM cost_center_area WHERE cost_center_area = ?;`,
        [ twoValidate ]);
    return { message: `OPERACIÓN: ${ twoValidate }, eliminada con éxito` };
};

/**
 * CENTRO DE COSTOS / SUBAREA (CEDI)
 */

// TRAER SUBAREA CENTRO DE COSTOS (CEDI)
export const getCostSubAreaModel = async (): Promise<{data: Data}> => {
    const [ data ] = await connection.query(`
        SELECT idcost_center_subarea AS id, 
                idcost_center_area AS fk, 
                cost_center_subarea AS number, 
                cost_center_subarea_name AS name 
                    FROM cost_center_subarea ORDER BY cost_center_subarea ASC;`);
    return { data };
};

// TRAER SUBAREA (CEDI) SEGÚN PK DEL AREA (OPERACIÓN)
export const getCostSubAreaByIdModel = async(data: string): Promise<{ message?:string, data?: Data }> => {
    const [ info ]: any = await connection.query(`
            SELECT idcost_center_subarea AS id, 
                    idcost_center_area AS fk, 
                    cost_center_subarea AS number, 
                    cost_center_subarea_name AS name 
                        FROM cost_center_subarea WHERE idcost_center_area = ? ORDER BY cost_center_subarea ASC;`, [ data ]);
    if ( info.length === 0 ) {
        return { message: `La OPERACIÓN: ${ data }, no se encuentra registrada` };
    };
    return { data: info };
};

// CREAR SUBAREA CENTRO DE COSTOS (CEDI)
export const postCostSubAreaModel = async(data: CenterCostSubArea): Promise<{message?: string, data?: Data}> => {
    const twoValidate = twoCharactersValidator(data.cost_center_subarea)
        const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM cost_center_subarea WHERE cost_center_subarea = ? AND idcost_center_area = ?;`,
            [ twoValidate, data.idcost_center_area ]);
        // @ts-ignore
        if( validate[0].contador !== 0 || twoValidate === 'INVALID_VALUED' ) {
            return { message: `CEDI: ${twoValidate} no es valido o ya se encuentra registrada en el sistema`};
        };
        await connection.query(`
        INSERT INTO cost_center_subarea (idcost_center_area, cost_center_subarea, cost_center_subarea_name)
        VALUES ( ?, ?, ? );
        `, [ data.idcost_center_area, twoValidate, data.cost_center_subarea_name.toUpperCase() ]);
        const [ costSubArea ] = await connection.query(`SELECT * FROM cost_center_subarea WHERE cost_center_subarea = ?`,
            [twoValidate])
        return{ message: `CEDI: ${twoValidate}, ${data.cost_center_subarea_name.toUpperCase()} creado con éxito`, data: costSubArea };
};

// ELIMINIAR SUBAREA CENTRO DE COSTOS (CEDI) / ¿ELIMINAR LAS FK?
export const deleteCostSubAreaModel = async(data: number): Promise<{message: string}> => {
    const twoValidate = twoCharactersValidator(data);
    const [ validate ]: any = await connection.query(`
            SELECT count(*) AS contador FROM cost_center_subarea WHERE cost_center_subarea = ?;`,
        [ twoValidate ]);
    if (validate[0].contador === 0 ) {
        return { message: `CEDI: ${ twoValidate }, no se encuentra registrado en el sistema` };
    };
    await connection.query(`
        DELETE FROM cost_center_subarea WHERE cost_center_subarea = ?;`,
        [ twoValidate ]);
    return { message: `CEDI: ${ twoValidate }, eliminado con éxito` };
};

/**
 * CENTRO DE COSTOS / CENTRO DE COSTOS (DEPENDENCIA)
 */

// TRAER CENTRO DE COSTOS (DEPENDENCIA)
export const getCostCenterModel = async(): Promise<{ data: Data }> => {
    const [ data ] = await connection.query(`
        SELECT idcost_center AS id, 
                idcost_center_subarea AS fk, 
                cost_center AS number, 
                cost_center_name AS name 
                    FROM cost_center ORDER BY cost_center ASC;`);
    return { data };
};

// TRAER CENTRO DE COSTOS (DEPENDENCIA) SEGÚN PK DEL SUBAREA (CEDI)
export const getCostCenterByIdModel = async(data: string): Promise<{message?: string, data?: Data}> => {
    const [ info ]: any = await connection.query(`
        SELECT idcost_center AS id, 
                idcost_center_subarea AS fk, 
                cost_center AS number, 
                cost_center_name AS name 
                    FROM cost_center WHERE idcost_center_subarea = ? ORDER BY cost_center ASC;`, [ data ]);
    if ( info.length === 0 ) {
        return { message: `La CEDI: ${ data }, no se encuentra registrada en el sistema` };
    };
    return { data: info }
};

// CREAR CENTRO DE COSTOS (DEPENDENCIA)
export const postCostCenterModel = async (data: CenterCost): Promise<{message?:string, data?:Data}> => {
    const twoValidate = twoCharactersValidator(data.cost_center)
    const [ validate ]: any = await connection.query(`
        SELECT count(*) AS contador FROM cost_center WHERE cost_center = ? AND idcost_center_subarea = ?;`,
            [ twoValidate, data.idcost_center_subarea ]);
    if( validate[0].contador !== 0 || twoValidate === 'INVALID_VALUED' ) {
        return { message: `DEPENCENCIA: ${ twoValidate } es invalida o ya se encuentra registrada en el sistema`};
    };
    await connection.query(`
        INSERT INTO cost_center (idcost_center_subarea, cost_center, cost_center_name)
            VALUES ( ?, ?, ? );
    `, [ data.idcost_center_subarea, twoValidate, data.cost_center_name.toUpperCase() ]);
    const [ costCenter ] = await connection.query(`SELECT * FROM cost_center WHERE cost_center = ?`,
        [ twoValidate ])
    return { message: `DEPENDENCIA: ${twoValidate}, ${data.cost_center_name.toUpperCase()} creada con éxito`, data: costCenter };
};

// ELIMINAR UN CENTRO DE COSTOS (DEPENDENCIA)
export const deleteCostCenterModel = async (data: number): Promise<{message: string}> => {
    const twoValidate = twoCharactersValidator(data);
    const [ validate ]: any = await connection.query(`
            SELECT count(*) AS contador FROM cost_center WHERE cost_center = ?;`,
        [ twoValidate ]);
    if (!validate[0].contador || twoValidate === 'INVALID_VALUED') {
        return { message: `DEPENDENCIA: ${ twoValidate }, no se encuentra registrado en el sistema` };
    };
    await connection.query(`
        DELETE FROM cost_center WHERE cost_center = ?;`,
        [ twoValidate ]);
    return { message: `DEPENDENCIA: ${ twoValidate }, fue eliminada con éxito` };
};