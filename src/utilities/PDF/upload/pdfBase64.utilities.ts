import fs from 'fs-extra';
import path from 'path';
const uuid = require("uuid/v4");


export const pdfBase64 = async( pdfBase64: string ): Promise<{fileName: string, filePath: string}> =>{
    // RUTA DEL ARCHIVO DONDE SE GUARDARA TEMPORALMENTE
    const tempFolderPath = path.join(__dirname, '../../../../temp'); 
    // CREAR LA CARPETA TEMPORAL SI NO EXISTE
    await fs.ensureDir(tempFolderPath);
    // NOMBRE DEL ARCHIVO
    const fileName = `${uuid()}.pdf`;
    // RUTA COMPLETA DEL ARCHIVO EN LA CARPETA TEMPORAL
    const filePath = path.join(tempFolderPath, fileName);
    // DECODIFICA Y GUARDA EL ARCHIVO EN LA CARPETA TEMPORAL
    await fs.writeFile(filePath, Buffer.from(pdfBase64, 'base64'));
    return { fileName, filePath } 
};