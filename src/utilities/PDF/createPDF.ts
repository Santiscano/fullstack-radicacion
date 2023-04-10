import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';

export const createPDF = ( radicado: string, tipoCedi: string, tipoCuenta: string ) => {
    const content: string = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RadicadoPdf</title>
        <style>
            p {
                font-size: 10px;
                width: 100%;
                margin-top: 5px;
                margin-left: 5px;
            }
            img {
                width: 50px;
                margin-left: 5px;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
            <div style="min-width: 30%">
                <img 
                    src="https://desarrolloenviexpress.site/e-control/pdf_v2/fotos/text_logo.png" 
                    alt="enviexpressLogo"
                />
            </div>
            <div>
                <p style="font-size: 10px; width: 100%; margin-top: 5px;">
                    ${radicado}
                </p>
                <p style="font-size: 10px; width: 100%; margin-top: 5px;">
                    ${tipoCedi}
                </p>
                <p style="font-size: 10px; width: 100%; margin-top: 5px;">
                    ${tipoCuenta}
                </p>
            </div>
        </div>
    </body>
    </html>
    `
    
    let options: Object = { 
        width: "132px",
        height: "61px"
    };

    pdf.create(content, options).toFile(`./temp/${radicado}.pdf`, function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
};






const content: string = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RadicadoPdf</title>
        <style>
            p {
                font-size: 10px;
                width: 100%;
                margin-top: 5px;
                margin-left: 5px;
            }
            img {
                width: 50px;
                margin-left: 5px;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
            <div style="min-width: 30%">
                <img 
                    src="https://desarrolloenviexpress.site/e-control/pdf_v2/fotos/text_logo.png" 
                    alt="enviexpressLogo"
                />
            </div>
            <div>
                <p style="font-size: 10px; width: 100%; margin-top: 5px;">
                    TEST1
                </p>
                <p style="font-size: 10px; width: 100%; margin-top: 5px;">
                    TEST2
                </p>
                <p style="font-size: 10px; width: 100%; margin-top: 5px;">
                    TEST3
                </p>
            </div>
        </div>
    </body>
    </html>
    `
    
let options: Object = { 
    // width: "132px",
    // height: "61px",
    type: 'pdf'
};


let filename: string = path.join(__dirname, '../../../src/companyFiles/test.pdf');
let output: string = path.join(__dirname, '../../../src/companyFiles/test-modify.pdf');

const html = `
    <div>
        <p style="font-size: 10px; width: 100%; margin-top: 5px;">
            TEST1
        </p>
        <p style="font-size: 10px; width: 100%; margin-top: 5px;">
            TEST2
        </p>
        <p style="font-size: 10px; width: 100%; margin-top: 5px;">
            TEST3
        </p>
    </div>
`;

console.log(filename, output)
// Leemos el archivo PDF existente
const existingPdf = fs.readFileSync(filename);

// Generamos un nuevo archivo PDF combinando el contenido existente y el nuevo contenido
pdf.create(html, options).toBuffer((error, buffer) => {
    error && console.log(error)
    const combinedPdf = Buffer.concat([existingPdf, buffer]);
    // console.log({existingPdf, buffer})
    // Escribimos el nuevo archivo PDF en disco
    fs.writeFileSync(output, combinedPdf);
    console.log('PDF modificado guardado en disco');
});