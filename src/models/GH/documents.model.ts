import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeDocuments  } from "../../interfaces/GH/documents.interface"


// CREAR DATOS 
export const postDocumentsModel = async (data:TypeDocuments): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL documents_create (?, ?, ?, ?, @p_message, @p_insert_id);`,[
    data.iddocuments_type, data.idhiring, data.documents_creation_date, data.documents_path
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ documentsCreated ] = await connection.query("SELECT * FROM documents WHERE iddocuments = ? ;",[insertId]);
  return { message, data:documentsCreated }
};

// ACTUALIZAR DATOS 
export const putDocumentsModel = async (data:TypeDocuments):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL documents_update(?, ?, ?, ?, ?, @p_message);`, [
    data.iddocuments, data.iddocuments_type, data.idhiring, data.documents_creation_date, data.documents_path
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ documentsUpdate ] = await connection.query("SELECT * FROM documents WHERE iddocuments = ?",[data.iddocuments]);
  return { message, data: documentsUpdate }
};
