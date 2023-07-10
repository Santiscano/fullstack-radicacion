import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypePersonalInformation  } from "../../interfaces/GH/personal_information.interface"


// CREAR DATOS 
export const postPersonalInformationModel = async (data:TypePersonalInformation): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL personal_information_create (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_message, @p_insert_id);`,[
    data.idhiring, data.personal_information_residence_address, data.personal_information_residence_city, data.personal_information_phone, data.personal_information_cellphone, data.personal_information_email, data.personal_information_civil_status, data.personal_information_gender, data.personal_information_academic_level, data.personal_information_medical_emergency, data.personal_information_arl_emergency
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ personalInformationCreated ] = await connection.query("SELECT * FROM personal_information WHERE idpersonal_information = ? ;",[insertId]);
  return { message, data:personalInformationCreated }
};

// ACTUALIZAR DATOS 
export const putPersonalInformationModel = async (data:TypePersonalInformation):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL personal_information_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_message);`, [
    data.idpersonal_information, data.idhiring, data.personal_information_residence_address, data.personal_information_residence_city, data.personal_information_phone, data.personal_information_cellphone, data.personal_information_email, data.personal_information_civil_status, data.personal_information_gender, data.personal_information_academic_level, data.personal_information_medical_emergency, data.personal_information_arl_emergency
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ personalInformationUpdate ] = await connection.query("SELECT * FROM personal_information WHERE idpersonal_information = ?",[data.idpersonal_information]);
  return { message, data: personalInformationUpdate }
};
