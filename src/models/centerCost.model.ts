import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

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
    return {data}
}