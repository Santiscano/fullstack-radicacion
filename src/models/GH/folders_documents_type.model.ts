import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeFoldersDocumentsType  } from "../../interfaces/GH/folders_documents_type.interface"


// CREAR DATOS 
export const postFoldersDocumentsTypeModel = async (data:TypeFoldersDocumentsType): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL folders_documents_type_create (?, ?, @p_message, @p_insert_id);`,[
    data.idfolders, data.iddocuments_type
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ foldersDocumentsTypeCreated ] = await connection.query("SELECT * FROM folders_documents_type WHERE idfolders_documents_type = ? ;",[insertId]);
  return { message, data:foldersDocumentsTypeCreated }
};

// ACTUALIZAR DATOS 
export const putFoldersDocumentsTypeModel = async (data:TypeFoldersDocumentsType):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL folders_documents_type_update(?, ?, ?, @p_message);`, [
    data.idfolders_documents_type, data.idfolders, data.iddocuments_type
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ foldersDocumentsTypeUpdate ] = await connection.query("SELECT * FROM folders_documents_type WHERE idfolders_documents_type = ?",[data.idfolders_documents_type]);
  return { message, data: foldersDocumentsTypeUpdate }
};
