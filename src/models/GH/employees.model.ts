import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeEmployees  } from "../../interfaces/GH/employees.interface"


// CREAR DATOS 
export const postEmployeesModel = async (data:TypeEmployees): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL employees_create (?, ?, ?, ?, ?, ?, ?, ?, @p_message, @p_insert_id);`,[
    data.employees_name, data.employees_lastname, data.employees_identification_type, data.employees_identification, data.employees_rh, data.employees_birthdate_date, data.employees_birthdate_city, data.employees_photo_path
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ employeesCreated ] = await connection.query("SELECT * FROM employees WHERE idemployees = ? ;",[insertId]);
  return { message, data:employeesCreated }
};

// ACTUALIZAR DATOS 
export const putEmployeesModel = async (data:TypeEmployees):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL employees_update(?, ?, ?, ?, ?, ?, ?, ?, ?, @p_message);`, [
    data.idemployees, data.employees_name, data.employees_lastname, data.employees_identification_type, data.employees_identification, data.employees_rh, data.employees_birthdate_date, data.employees_birthdate_city, data.employees_photo_path
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ employeesUpdate ] = await connection.query("SELECT * FROM employees WHERE idemployees = ?",[data.idemployees]);
  return { message, data: employeesUpdate }
};
