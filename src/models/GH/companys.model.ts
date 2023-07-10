import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeCompanys  } from "../../interfaces/GH/companys.interface"


// CREAR DATOS 
export const postCompanysModel = async (data:TypeCompanys): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL companys_create (?, ?, ?, @p_message, @p_insert_id);`,[
    data.companys_name, data.companys_address, data.companys_phone
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ companysCreated ] = await connection.query("SELECT * FROM companys WHERE idcompanys = ? ;",[insertId]);
  return { message, data:companysCreated }
};

// ACTUALIZAR DATOS 
export const putCompanysModel = async (data:TypeCompanys):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL companys_update(?, ?, ?, ?, @p_message);`, [
    data.idcompanys, data.companys_name, data.companys_address, data.companys_phone
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ companysUpdate ] = await connection.query("SELECT * FROM companys WHERE idcompanys = ?",[data.idcompanys]);
  return { message, data: companysUpdate }
};
