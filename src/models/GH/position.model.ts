import { connection } from '../../config/database/db';
import { countTable } from '../../utilities/SQL/countTable.utilities';

// CREAR UNA POSICIÓN
export const postPositionModel = async ( data: string): Promise<{ message?: string }> => {
    if (await countTable("position_company", "position_company_name", data.toUpperCase()) !== 0) return {message: `LA POSICIÓN ${data}, YA EXISTE EN EL SISTEMA`}
    await connection.query("INSERT INTO position_company (position_company_name) VALUES ( ? );", data.toUpperCase() );
    return { message: undefined };
};