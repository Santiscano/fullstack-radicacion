import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeFolders  } from "../../interfaces/GH/folders.interface"


// CREAR DATOS 
export const postFoldersModel = async (data:TypeFolders): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL folders_create (?, ?, @p_message, @p_insert_id);`,[
    data.folders_name, data.folders_description
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ foldersCreated ] = await connection.query("SELECT * FROM folders WHERE idfolders = ? ;",[insertId]);
  return { message, data:foldersCreated }
};

// ACTUALIZAR DATOS 
export const putFoldersModel = async (data:TypeFolders):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL folders_update(?, ?, ?, @p_message);`, [
    data.idfolders, data.folders_name, data.folders_description
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ foldersUpdate ] = await connection.query("SELECT * FROM folders WHERE idfolders = ?",[data.idfolders]);
  return { message, data: foldersUpdate }
};
