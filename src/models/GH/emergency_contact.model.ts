import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeEmergencyContact  } from "../../interfaces/GH/emergency_contact.interface"


// CREAR DATOS 
export const postEmergencyContactModel = async (data:TypeEmergencyContact): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL emergency_contact_create (?, ?, ?, ?, ?, ?, @p_message, @p_insert_id);`,[
    data.idpersonal_information, data.emergency_contact_name, data.emergency_contact_lastname, data.emergency_contact_relationship, data.emergency_contact_phone, data.emergency_contact_cell_phone
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ emergencyContactCreated ] = await connection.query("SELECT * FROM emergency_contact WHERE idemergency_contact = ? ;",[insertId]);
  return { message, data:emergencyContactCreated }
};

// ACTUALIZAR DATOS 
export const putEmergencyContactModel = async (data:TypeEmergencyContact):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL emergency_contact_update(?, ?, ?, ?, ?, ?, ?, @p_message);`, [
    data.idemergency_contact, data.idpersonal_information, data.emergency_contact_name, data.emergency_contact_lastname, data.emergency_contact_relationship, data.emergency_contact_phone, data.emergency_contact_cell_phone
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ emergencyContactUpdate ] = await connection.query("SELECT * FROM emergency_contact WHERE idemergency_contact = ?",[data.idemergency_contact]);
  return { message, data: emergencyContactUpdate }
};
