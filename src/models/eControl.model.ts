import fs from 'fs-extra';
import path from 'path';
import { connection } from '../config/database/db';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { eControl } from '../interfaces/eControl.interface';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | ResultSetHeader


// export const eControlOperativoModel = async(pdfBase64: string): Promise<string> =>{
//     // RUTA DEL ARCHIVO DONDE SE GUARDARA TEMPORALMENTE
//     const tempFolderPath = path.join(__dirname, '../../temp'); 
//     // CREAR LA CARPETA TEMPORAL SI NO EXISTE
//     await fs.ensureDir(tempFolderPath);
//     // NOMBRE DEL ARCHIVO
//     const fileName = `documento_${Date.now()}.pdf`;
//     // RUTA COMPLETA DEL ARCHIVO EN LA CARPETA TEMPORAL
//     const filePath = path.join(tempFolderPath, fileName);
//     // DECODIFICA Y GUARDA EL ARCHIVO EN LA CARPETA TEMPORAL
//     await fs.writeFile(filePath, Buffer.from(pdfBase64, 'base64'));
//     return filePath; // DEVUELVE LA RUTA DEL ARCHIVO
// };


export const eControlOperativoModel = async(data: eControl): Promise<string> =>{
    // RUTA DEL ARCHIVO DONDE SE GUARDARA TEMPORALMENTE
    const tempFolderPath = path.join(__dirname, '../../temp'); 
    // CREAR LA CARPETA TEMPORAL SI NO EXISTE
    await fs.ensureDir(tempFolderPath);
    // NOMBRE DEL ARCHIVO
    const fileName = `documento_${Date.now()}.pdf`;
    // RUTA COMPLETA DEL ARCHIVO EN LA CARPETA TEMPORAL
    const filePath = path.join(tempFolderPath, fileName);
    // DECODIFICA Y GUARDA EL ARCHIVO EN LA CARPETA TEMPORAL
    await fs.writeFile(filePath, Buffer.from(data.pdfPurchaseOrder, 'base64'));
    return filePath; // DEVUELVE LA RUTA DEL ARCHIVO
};
