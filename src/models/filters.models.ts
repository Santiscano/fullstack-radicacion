import { connection } from "../config/database/db";
import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2/promise";
import { countTable } from "../utilities/SQL/countTable.utilities";
import {
    getOneRowTable,
} from "../utilities/SQL/getTable.utilities";

type Data =
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader
    | ResultSetHeader;

// TRAER TODOS LOS RADICADOS (SOLO RADICADO)
export const getAllRegisteredFileModel = async (): Promise<{ data: Data }> => {
    const [data] = await connection.query(
        `SELECT files_registered FROM files ORDER BY idfiles ASC;`
    );
    return { data };
};

// TRAER LOS USUARIOS (PROVEEDOR) SEGÚN EL TIPO DE DOCUMENTO
export const getIdentificationByTypeModel = async (
    identification: string
): Promise<{ data: Data }> => {
    const [data] = await connection.query(
        `SELECT * FROM users WHERE users_identification_type = ? AND idroles = 1`,
        [identification.toUpperCase()]
    );
    return { data };
};

// TRAER LOS TIPOS DE DOCUMENTOS
export const getTypeIdentificationModel = () => {
    const data = [
        { typeDocument: "CEDULA CIUDADANIA" },
        { typeDocument: "CEDULA EXTRANJERIA" },
        { typeDocument: "NIT" },
        { typeDocument: "PASAPORTE" },
        { typeDocument: "RUT" },
    ];
    return { data };
};

// FILTRO DE ARCHIVOS Y RUTAS, SEGÚN RADICADO
export const registeredFilterModel = async (
    data: string
): Promise<{ message?: string; data?: Data; path: Data }> => {
    const [dataInfo] = await connection.query(
        `
        SELECT * FROM ShowTable
                WHERE files_registered = ?;`,
        data
    );
    //@ts-ignore
    if (dataInfo.length === 0) return { message: `No se ha encontado información adjunta al RADICADO: ${data}`,};
    //@ts-ignore
    const file = dataInfo[0].idfiles;
    const [path] = await connection.query(
        `
        SELECT * FROM files_path WHERE idfiles = ?;
        `,
        [file]
    );
    return { data: dataInfo, path };
};

// FILTRO DE ARCHIVOS Y RUTAS, SEGÚN TIPO Y NUMERO DE CUENTA
export const accountTypeFilterModel = async (data: {
    files_account_type: string;
    files_account_type_number: string;
}): Promise<{ message?: string; data?: Data; path?: Data }> => {
    const [response] = await connection.query(
        `
        SELECT * FROM ShowTable
            WHERE files_account_type = ? AND files_account_type_number = ?;`,
        [data.files_account_type, data.files_account_type_number]
    );
    //@ts-ignore
    if (response.length === 0) {
        return {
            message: `No se ha encontado información adjunta a ${data.files_account_type}: ${data.files_account_type_number}`,
        };
    }
    //@ts-ignore
    const file = response[0].idfiles;
    const [path] = await connection.query(
        `
        SELECT * FROM files_path WHERE idfiles = ?;`,
        [file]
    );
    return { data: response, path };
};

// ACCIÓN DE DOCUMENTOS
export const actionFilterModel = async (
    data: number
): Promise<{ message?: string; data?: { stateFile: string }[] }> => {
    if ((await countTable("roles", "idroles", data)) === 0)
        return { message: `Numero de ROL: ${data}, no esxiste en el sistema` };
    const [rolInfo]: any = await getOneRowTable("roles", "idroles", data);
    const [stateInfo]: any = await connection.query(
        `SELECT * FROM files_states`
    );
    if (rolInfo.roles_description === "AUDITOR") {
        return {
            data: [
                stateInfo[2],
                stateInfo[6],
                stateInfo[7],
                stateInfo[8],
                stateInfo[9],
                stateInfo[10],
            ],
        };
    }
    if (rolInfo.roles_description === "GERENCIA") {
        return {
            data: [
                stateInfo[3],
                stateInfo[6],
                stateInfo[7],
                stateInfo[8],
                stateInfo[9],
                stateInfo[10],
            ],
        };
    }
    if (rolInfo.roles_description === "CONTABILIDAD") {
        return {
            data: [
                stateInfo[4],
                stateInfo[6],
                stateInfo[7],
                stateInfo[8],
                stateInfo[9],
                stateInfo[10],
            ],
        };
    }
    if (rolInfo.roles_description === "TESORERIA") {
        return {
            data: [
                stateInfo[5],
                stateInfo[6],
                stateInfo[7],
                stateInfo[8],
                stateInfo[9],
                stateInfo[10],
            ],
        };
    }

    return { message: "No cuentas con un rol apto para esta función" };
};

export const usersFilterToNextAuditorModel = async (
    data: number
): Promise<{ message?: string; data?: Data }> => {
    let dataResult: Data = [];

    if (data == 3 || data == 4 || data == 5) {
        const [dataInfo] = await connection.query(
            `
        SELECT users.*, roles.roles FROM users
            JOIN roles ON users.idroles = roles.idroles
                WHERE users.idroles = ?`,
            6
        );
        dataResult = dataInfo;
    }
    if (data == 6) {
        const [dataInfo] = await connection.query(
            `
        SELECT users.*, roles.roles FROM users
            JOIN roles ON users.idroles = roles.idroles
                WHERE users.idroles = ?`,
            7
        );
        dataResult = dataInfo;
    }
    if (data == 7) {
        const [dataInfo] = await connection.query(
            `
        SELECT users.*, roles.roles FROM users
            JOIN roles ON users.idroles = roles.idroles
                WHERE users.idroles = ?`,
            8
        );
        dataResult = dataInfo;
    }
    if (data == 8) {
        const [dataInfo] = await connection.query(
            `
        SELECT users.*, roles.roles FROM users
            JOIN roles ON users.idroles = roles.idroles
                WHERE users.idroles = ?`,
            10
        );
        dataResult = dataInfo;
    }
    return { data: dataResult };
};

export const usersFilterReturnAuditorModel = async (): Promise<{
    message?: string;
    data?: Data;
}> => {
    const [dataInfo] = await connection.query(
        `
        SELECT users.*, roles.roles FROM users
            JOIN roles ON users.idroles = roles.idroles
                WHERE users.idroles IN (?,?,?,?) `,
        [3, 4, 5, 6]
    );
    return { data: dataInfo };
};

/**
 * REPORTERO
 */

export const pendingReportModel = async (type: string) => {
    const [query] = await connection.query(
        `SELECT
        F.files_registered AS 'F.files_registered',
        T.tracking_date AS 'T.tracking_date',
        F.files_account_type AS 'F.files_account_type',
        F.files_account_type_number AS 'F.files_account_type_number',
        CONCAT(P.users_identification,"-", P.users_identification_digital_check) AS 'Documento',
        CONCAT(P.users_name," ", P.users_lastname) AS 'Razón Social',
        F.files_price AS 'F.files_price',
        F.files_cost_center AS 'F.files_cost_center',
        S.sedes_name AS 'S.sedes_name',
        F.files_type AS 'F.files_type',
        FS.files_states AS 'FS.files_states',
        CONCAT(UF.users_name," ", UF.users_lastname) AS 'Responsable',
        R.roles AS 'R.roles',
        CONCAT(U.users_name," ", U.users_lastname) AS 'Radico'
    FROM
        files F
        LEFT JOIN tracking T ON F.idfiles = T.idfiles
        LEFT JOIN sedes S ON F.idsedes = S.idsedes
        LEFT JOIN users U ON U.idusers = T.idusers
        LEFT JOIN users P ON P.idusers = F.idproviders
        LEFT JOIN users UF ON UF.idusers = F.idusers
        LEFT JOIN roles R ON UF.idroles = R.idroles
        LEFT JOIN files_states FS ON FS.idfiles_states = F.idfiles_states
WHERE
    F.files_type = ?
    AND F.idfiles_states <> 6 AND F.idfiles_states <> 8 AND F.idfiles_states <> 11 
    AND T.idfiles_states = 1;`,
        [type]
    );
    return query;
};

export const finishedReportModel = async (
    typo: string,
    startDate: string,
    endDate: string
) => {
    const start: string[] = startDate.split("-");
    const end: string[] = endDate.split("-");
    let startDay: number = Number(start[start.length - 1].trim());
    let endDay: number = Number(end[end.length - 1].trim());
    const START = `${start[0]}-${start[1]}-${startDay - 1}`
    const END = `${end[0]}-${end[1]}-${endDay + 1}`

    const [query] = await connection.query(
        `SELECT
        F.files_registered AS 'F.files_registered',
        T.tracking_date AS 'T.tracking_date',
        F.files_account_type AS 'F.files_account_type',
        F.files_account_type_number AS 'F.files_account_type_number',
        CONCAT(P.users_identification,"-", P.users_identification_digital_check) AS 'Documento',
        CONCAT(P.users_name," ", P.users_lastname) AS 'Razón Social',
        F.files_price AS 'F.files_price',
        F.files_cost_center AS 'F.files_cost_center',
        F.files_code_treasury AS 'F.files_code_treasury',
        S.sedes_name AS 'S.sedes_name',
        F.files_type AS 'F.files_type',
        FS.files_states AS 'FS.files_states',
        CONCAT(U.users_name," ", U.users_lastname) AS 'Aprobo',
        R.roles AS 'R.roles'
    FROM
        files F
        LEFT JOIN tracking T ON F.idfiles = T.idfiles
        LEFT JOIN sedes S ON F.idsedes = S.idsedes
        LEFT JOIN users U ON U.idusers = T.idusers
        LEFT JOIN users P ON P.idusers = F.idproviders
        LEFT JOIN users UF ON UF.idusers = F.idusers
        LEFT JOIN roles R ON UF.idroles = R.idroles
        LEFT JOIN files_states FS ON FS.idfiles_states = F.idfiles_states
	WHERE
		F.files_type = ?
    AND F.idfiles_states = 6 AND T.idfiles_states = 6
    AND T.tracking_date BETWEEN ? AND ?
    `,
        [typo, START, END]
    );
    return query;
};
