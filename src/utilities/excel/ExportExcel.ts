import "dotenv/config";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";

export const ExportExcel = async (datos: any, headers: string[], name: string) => {
    const storageFolder = path.join(__dirname, "../../../temp/");
    if (!fs.existsSync(storageFolder)) {
        fs.mkdirSync(storageFolder);
    }
    const fullname = `${name}.xlsx`;
    const filePath = path.join(storageFolder, fullname);
    const workbook = new ExcelJS.Workbook();
    // Crear una nueva hoja de cálculo
    const worksheet = workbook.addWorksheet("Hoja1");
    // Agregar los encabezados a la hoja de cálculo
    const headerRow = worksheet.addRow(headers);

    worksheet.autoFilter =
        worksheet.getColumn(1).letter +
        "1:" +
        worksheet.getColumn(headers.length).letter +
        (datos.length + 1);

    // Agregar los datos a la hoja de cálculo
    datos.forEach((fila: any, index: any) => {
        const row = worksheet.addRow(fila);
        let fillColor = index % 2 === 0 ? "FFFFFF" : "C0C0C0";
        for (let column = 1; column < headers.length + 1; column++) {
            const cell = row.getCell(column);
            const cellHeaders = headerRow.getCell(column);
            cellHeaders.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "2759CD" },
            };
            cellHeaders.font = { color: { argb: "FFFFFF" }, bold: true
            }
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: fillColor },
            };
        }
    });

    await workbook.xlsx.writeFile(filePath);
    return `${process.env.URL_EXCEL}/archivos/${fullname}`;
};

// COMO UTILIZAR EL METODO "ExportExcel"
// const data = [
//   { nombre: "Santiago", apellido: "Ospina" },
//   { nombre: "Daniel", apellido: "Josefin" },
// ];
// const datos = data.map((resultado) => Object.values(resultado));

// PARAMETROS: datos, cabezeros y nombre del archivo
// const link= File.ExportExcel(datos,["Nombre", "Apellido"],"emily");
// return res.json(link);

// recordar para siempre