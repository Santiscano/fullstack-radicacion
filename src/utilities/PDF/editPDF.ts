import { degrees, PDFDocument, rotateDegrees } from 'pdf-lib';
import { promises as fs } from 'fs';
import path from 'path';
import {firstCapitalLetter} from '../firstCapitalLetter';

export const editPDF = async ( inputFilePath: string, outputFilePath: string, radicado: string ) => {
    try {
        // Lee el archivo PDF de entrada
        const inputPdf = await fs.readFile(inputFilePath);
        // Carga el PDF en pdf-lib
        const pdfDoc = await PDFDocument.load(inputPdf);
        // Modifica el contenido del PDF
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        console.log(width, height)
        // Posición y parametros para editar
        const optionsDestock: object = {
            x: 225,
            y: 25,
            size: 12,
            rotate: degrees(180)
        };
        const optionsOnlineHotizontal: object = {
            x: 520,
            y: 590,
            size: 12,
        };
        const optionsOnlineVertical: object = {
            x: width * 0.654,
            y: height * 0.973,
            size: 12,
        };
        //Información de la edición;
        const dataEdit: string = radicado;
        // const dataEdit: string = radicado + "\n" + firstCapitalLetter(tipoCuenta);
        firstPage.drawText( dataEdit, optionsOnlineVertical );
    
        // Guarda el PDF modificado en el archivo de salida
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(outputFilePath, pdfBytes);
        console.log({error: false, message: 'PDF modificado con éxito'});
    } catch (err) {
        console.log({error: true, err});
    };
};

// const filename: string = path.join(__dirname, '../../../src/companyFiles/casa.pdf');
// const output: string = path.join(__dirname, '../../../src/companyFiles/test-modify1.pdf');

// editPDF(filename, output, "185-MEDELLÍN-2732023T4:46:46PM","FACTURA PROVEEDOR")



// // Ejemplo de uso
// editPdf(filename, output, "185-MEDELLÍN-2732023T4:46:46PM","FACTURA PROVEEDOR")
//     .then(() => console.log('PDF modificado con éxito'))
//     .catch((error) => console.log('Error al modificar el PDF', error));
