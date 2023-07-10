import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeDocumentsType  } from "../../interfaces/GH/documents_type.interface"


// CREAR DATOS 
export const postDocumentsTypeModel = async (data:TypeDocumentsType): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL documents_type_create (?, @p_message, @p_insert_id);`,[
    data.documents_type_name
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ documentsTypeCreated ] = await connection.query("SELECT * FROM documents_type WHERE iddocuments_type = ? ;",[insertId]);
  return { message, data:documentsTypeCreated }
};

// ACTUALIZAR DATOS 
export const putDocumentsTypeModel = async (data:TypeDocumentsType):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL documents_type_update(?, ?, @p_message);`, [
    data.iddocuments_type, data.documents_type_name
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ documentsTypeUpdate ] = await connection.query("SELECT * FROM documents_type WHERE iddocuments_type = ?",[data.iddocuments_type]);
  return { message, data: documentsTypeUpdate }
};
