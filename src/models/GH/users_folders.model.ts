import { connection } from "../../config/database/db";
import type Data from '../../interfaces/DataSql2.interface';
import { TypeUsersFolders  } from "../../interfaces/GH/users_folders.interface"


// CREAR DATOS 
export const postUsersFoldersModel = async (data:TypeUsersFolders): Promise<{message: string, data?: Data}> => {
  await connection.query(`
  CALL users_folders_create (?, ?, @p_message, @p_insert_id);`,[
    data.idusers, data.idfolders
  ]);
  // @ts-ignore
  const [[{ message, insertId }]] = await connection.query("SELECT @p_message AS message, @p_insert_id AS insertId;");
  if(insertId == null) {
    return { message }
  }
  const [ usersFoldersCreated ] = await connection.query("SELECT * FROM users_folders WHERE idusers_folders = ? ;",[insertId]);
  return { message, data:usersFoldersCreated }
};

// ACTUALIZAR DATOS 
export const putUsersFoldersModel = async (data:TypeUsersFolders):Promise<{message: string, data?: Data}> => {
  await connection.query(`CALL users_folders_update(?, ?, ?, @p_message);`, [
    data.idusers_folders, data.idusers, data.idfolders
  ]);
  const [result] = await connection.query('SELECT @p_message AS message;');
  // @ts-ignore
  const message = result[0].message;
  if (message.startsWith('Los datos')) {
    return { message };
  }
  const [ usersFoldersUpdate ] = await connection.query("SELECT * FROM users_folders WHERE idusers_folders = ?",[data.idusers_folders]);
  return { message, data: usersFoldersUpdate }
};
