import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypePositionCompany  } from "../../interfaces/GH/position_company.interface"


// CREAR DATOS 
export const postPositionCompanyModel = async (data:TypePositionCompany): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL position_company_create (?, @p_message, @p_insert_id);`,[
    data.position_company_name
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ positionCompanyCreated ] = await connection.query("SELECT * FROM position_company WHERE idposition_company = ? ;",[insertId]);
  return { message, data:positionCompanyCreated }
};

// ACTUALIZAR DATOS 
export const putPositionCompanyModel = async (data:TypePositionCompany):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL position_company_update(?, ?, @p_message);`, [
    data.idposition_company, data.position_company_name
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ positionCompanyUpdate ] = await connection.query("SELECT * FROM position_company WHERE idposition_company = ?",[data.idposition_company]);
  return { message, data: positionCompanyUpdate }
};
