import "dotenv/config";
import path from "path";


export const  uploadFile = async ( ruta: string, destino: string ) => {
    const GOOGLE_CLOUD_PROJECT = process.env.PROJECT_NAME                       // Nombre del proyecto en Google Cloud
    const GOOGLE_CLOUD_BUCKET = process.env.BUCKET_NAME                         // Nombre del Bucket
    const FILE_NAME = path.join(__dirname, `../../companyFiles/${ruta}`)              // Nombre del archivo a subir      
    const DETINATION_FILE = destino                                             // Nombre del archivo a subir
    const { Storage } = require('@google-cloud/storage');                       // Importar la libreria del storage

    const storage = new Storage({
        projectID: GOOGLE_CLOUD_PROJECT,
        keyFilename: path.join(__dirname, "./key.json")
    });
    
    try {
        await storage.bucket(GOOGLE_CLOUD_BUCKET).upload(FILE_NAME, {
            destination: DETINATION_FILE,
        });
    console.log(`${FILE_NAME} uploaded to ${GOOGLE_CLOUD_BUCKET}`);
    } catch(error) {
        console.log(error);
    }
}