import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';


type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader 

// SHOW AND PENDING TABLE
export const showTableModel = async (data?: number): Promise<{data: Data}> => {
    if (data !== undefined) {
        const [ dataPending ] = await connection.query(`
        SELECT * FROM ShowTable WHERE idusers = ?`, [ data ]);
        return { data: dataPending };
    };
    const [ dataShow ] = await connection.query(`
            SELECT * FROM ShowTable;`);
    return { data: dataShow };
};

// HISTORY TABLE
export const historyTableModel = async (data: number): Promise<{data: Data}> => {
    const [ dataHistory ] = await connection.query(`
            SELECT * FROM HistoryTable WHERE tracking_user = ?;`, [ data ]);
    return { data: dataHistory };
};