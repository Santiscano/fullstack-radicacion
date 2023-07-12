import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeHiring  } from "../../interfaces/GH/hiring.interface"


// CREAR DATOS 
export const postHiringModel = async (data:TypeHiring): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL hiring_create (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_message, @p_insert_id);`,[
    data.idemployees, data.idposition_company, data.idcompanys, data.hiring_entry_date, data.hiring_departure_date, data.hiring_salary, data.hiring_cost_center, data.hiring_eps, data.hiring_pension, data.hiring_family_compensation_fund, data.hiring_layoffs, data.hiring_arl, data.hiring_shirt_size, data.hiring_pant_size, data.hiring_shoe_size, data.hiring_status, data.hiring_revision_entry, data.hiring_revision_departure
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ hiringCreated ] = await connection.query("SELECT * FROM hiring WHERE idhiring = ? ;",[insertId]);
  return { message, data:hiringCreated }
};

// ACTUALIZAR DATOS 
export const putHiringModel = async (data:TypeHiring):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL hiring_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_message);`, [
    data.idhiring, data.idemployees, data.idposition_company, data.idcompanys, data.hiring_entry_date, data.hiring_departure_date, data.hiring_salary, data.hiring_cost_center, data.hiring_eps, data.hiring_pension, data.hiring_family_compensation_fund, data.hiring_layoffs, data.hiring_arl, data.hiring_shirt_size, data.hiring_pant_size, data.hiring_shoe_size, data.hiring_status, data.hiring_revision_entry, data.hiring_revision_departure
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ hiringUpdate ] = await connection.query("SELECT * FROM hiring WHERE idhiring = ?",[data.idhiring]);
  return { message, data: hiringUpdate }
};
