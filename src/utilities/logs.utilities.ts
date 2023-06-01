import * as fs from 'fs-extra';
import path from 'path';
import moment from 'moment-timezone';


export interface Logs {
    fileName: string;
    id?: number;
    error: boolean;
    date?: string;
    files_account_type_number: string;
    files_cost_center: string;
    files_code_accounting: string;
    users_identification_type: string;
    users_identification: string;
    message: string;
};

export interface GeneralLogs {
    
};

const logPath = path.join(__dirname, '../../logs'); 


export const writeLog = (data: Logs) => {
    // HORA LOCAL COLOMBIA
    const date = moment.tz(new Date(), "America/Bogota").format();
    const newDate = date.replace("-05:00", "").replace("T", " ");
    // NOMBRE DEL ARCHIVO
    const fileName = `/${data.fileName}.log`;
    const filePath = logPath + fileName;
    
    let infoLog = "";
    let alert = "";

    data.error === true
        ? alert = "[WARNING]"
        : alert = "[SUCCESS]"

    infoLog = `${newDate} ${alert} ${data.users_identification_type.toUpperCase()}: ${data.users_identification} '${data.files_account_type_number.toUpperCase()}': ${data.message}\n`
    fs.appendFile(filePath, infoLog, async (err) => {
        if (err) {
            await fs.ensureDir(logPath);                            // CREA CARPETA
            fs.writeFile(logPath + fileName, infoLog);              // CREA ARCHIVO
            return;
        }
    });
};

//   const data: Logs = {
//     fileName: "e-control",
//     error: false,
//     users_identification_type: "CEDULA CIUDADANIA",
//     users_identification: "6774151",
//     files_cost_center: "020103",
//     files_code_accounting: "183245",
//     files_account_type_number: "OC-9",
//     message: "TAMOS MELOS SI ENTRA"
// }

