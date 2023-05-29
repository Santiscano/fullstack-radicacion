import fs from 'fs';
import { connection } from '../config/database/db';
import { uploadFile } from '../config/gcp/storage';
import { editPDF } from '../utilities/PDF/editPDF';
import { pdfBase64 } from '../utilities/PDF/upload/pdfBase64.utilities';
import { postFileEcontrolModel } from './files.model';
import { postFilePathModel } from './file_path.model';
import { eControl } from '../interfaces/eControl.interface';
import { FileEcontrol } from '../interfaces/files.interface';
import { FilePath } from '../interfaces/file_path.interface';
import { genRegistered } from '../utilities/generate_file_registered.controller';


// CONEXIÓN OPERATIVA ECONTROL / GESTIÓN ADMINISTRATIVA
export const eControlOperativoModel = async(data: eControl): Promise<{error:boolean, message: string}> => {
    const radicado: string = await genRegistered();
    const userSession = 5;
    // VALIDACIÓN DE PROVEEDOR
    const [ proValidate ]: any = await connection.query(`SELECT * FROM users WHERE users_identification_type = ? AND users_identification = ? AND idroles = 1;`, [data.users_identification_type.toUpperCase(), data.users_identification]);
    if(proValidate.length === 0) return {error: true, message: `El PROVEEDOR con ${data.users_identification_type.toUpperCase()}: ${data.users_identification}, no se encuentra registrado en GESTIÓN ADMINISTRATIVO`}
    
    const dataFile: FileEcontrol = {
        files_registered: radicado, 
        idsedes: 1,                                 // CEDI MEDELLÍN
        idproviders: proValidate[0].idusers, 
        idusers: 3,                                 // USUARIO CONTABILIDAD GENERAL
        files_type: 2,                              // OPERATIVO
        files_price: data.files_price,
        files_account_type: data.files_account_type,
        files_account_type_number: data.files_account_type_number,
        files_cost_center: data.files_cost_center,
        files_code_accounting: data.files_code_accounting,
        userSession                                 // USUARIO E-CONTROL
    };

    // CREAR EL FILE EN LA BD
    const file: any = await postFileEcontrolModel(dataFile);
    
    if(!file.data) return {error: true, message: file.message};

    // CARGA DE LOS DOCUMENTOS AL BACKEND
    const pdfPurchaseOrder = await pdfBase64(data.pdfPurchaseOrder);
    const pdfElectronicBill = await pdfBase64(data.pdfElectronicBill);

    /**BUCKET GOOGLE */
    const purchaseOrderName = `${radicado}-OC`;
    const electronicBillName = `${radicado}-FE`;
    
    // URL DEL LOS ARCHIVOS
    const urlPurchaseOrder: string = `https://storage.cloud.google.com/${process.env.BUCKET_NAME}/${process.env.BUCKET_ASSIGN_ECONTROL}/operativo/${purchaseOrderName}.pdf?authuser=3`
    const urlElectronicBill: string = `https://storage.cloud.google.com/${process.env.BUCKET_NAME}/${process.env.BUCKET_ASSIGN_ECONTROL}/operativo/${electronicBillName}.pdf?authuser=3`
    
    // EDITAR PDF (AGREGAR RADICADO)
    await editPDF(pdfPurchaseOrder.filePath, pdfPurchaseOrder.filePath, purchaseOrderName);
    await editPDF(pdfElectronicBill.filePath, pdfElectronicBill.filePath, electronicBillName);
    
    // CARGAR EL PDF AL BUCKET
    await uploadFile(pdfPurchaseOrder.fileName, `${process.env.BUCKET_ASSIGN_ECONTROL}/operativo/${purchaseOrderName}.pdf`);
    await uploadFile(pdfElectronicBill.fileName, `${process.env.BUCKET_ASSIGN_ECONTROL}/operativo/${electronicBillName}.pdf`);
    
    // ELIMINAR ARCHIVO DEL SERVIDOR
    fs.unlinkSync(pdfPurchaseOrder.filePath);
    fs.unlinkSync(pdfElectronicBill.filePath);    
    
    const dataFilePathOC: FilePath = {
        idfiles: file.data[0].idfiles,
        files_path: urlPurchaseOrder,
        files_path_observation: `ORDEN DE COMPRA: ${data.files_account_type_number.toUpperCase()}, cargada con éxito.`, 
        userSession
    };

    const dataFilePathFE: FilePath = {
        idfiles: file.data[0].idfiles,
        files_path: urlElectronicBill,
        files_path_observation: `${data.files_account_type.toUpperCase()}, adjuntada a la ORDEN DE COMPRA: ${data.files_account_type_number.toUpperCase()}, cargada con éxito.`, 
        userSession
    };

    await postFilePathModel(dataFilePathOC);
    await postFilePathModel(dataFilePathFE);


    return { error: false, message: dataFilePathOC.files_path_observation };
};
