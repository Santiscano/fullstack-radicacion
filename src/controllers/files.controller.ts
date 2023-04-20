import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { genRegistered } from '../utilities/generate_file_registered.controller';
import { missingData } from '../utilities/missingData.utilities';
import { postTraking } from './tracking.controller';
import { createPDF } from '../utilities/PDF/createPDF';

// Generar un radicado 
export const genFileRegistered = async ( req: Request, res: Response ) => {
    const { api_key } = req.body; 
    try {
        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        let result = await genRegistered();
        return res.status(200).json({ error: false, result });
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ error: true, message: "Error del servidor para generar un radicado" });
    };
};

// Traer los archivos
export const getFiles = async ( req:Request, res:Response ) => {
    const { api_key } = req.body;
    try {
        if (api_key !== process.env.API_KEY){
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para acceder a esta información" });
        };
        const [files] = await connection.query('SELECT * FROM files;');
        return res.status(200).json({error: false, files});
    } catch (err) {
        // console.log(err);
        return res.status(508).json({ error: true, message: "Error del servidor para traer los Archivos"})
    }
};

// Agregar un archivo
export const postFile = async (req: Request, res: Response) => {
    const { files_registered, idsedes, idproviders, idusers, files_type, files_price, files_account_type, files_account_type_number, userSession } = req.body;
    const valores = [ files_registered, idsedes, idproviders, idusers, files_type, files_price, files_account_type, files_account_type_number, userSession ]
    const idfiles_states = 1;                     // ESTADO ASIGNADO
    const tracking_observation = `INICIO DEL PROCESO DEL ${files_registered} EXITOSO`;
    try {
        if(missingData(valores)) {
            return res.status(422).json({error: true, message: "MISSING_VALUES"});
        };
        const [ registeredVal ] = await connection.query(`
                SELECT count(*) AS contador FROM files WHERE files_registered = ?;`,
            [ files_registered ]);
        const [ filesAccountVal ] = await connection.query(`
                SELECT count(*) AS contador FROM files WHERE files_account_type = ? AND files_account_type_number = ?;`,
            [ files_account_type, files_account_type_number ]);
        //@ts-ignore
        if (registeredVal[0].contador !== 0){
            return res.status(500).json({ error: true, message: `Radicado: ${ files_registered.toUpperCase() }, ya se encuentra creado en la base de datos`})
        };
        //@ts-ignore
        if (filesAccountVal[0].contador !== 0){
            return res.status(500).json({ error: true, message: `${ files_account_type.toUpperCase() }: ${ files_account_type_number.toUpperCase() }, ya se encuentra creado en la base de datos`})
        };
        await connection.query(`
            INSERT INTO files (idproviders, idsedes, idusers, files_type, files_registered, files_price, files_account_type, files_account_type_number)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, 
                [ idproviders, 
                    idsedes, 
                    idusers, 
                    files_type.toUpperCase(), 
                    files_registered.toUpperCase(), 
                    files_price, 
                    files_account_type.toUpperCase(), 
                    files_account_type_number.toUpperCase() ]);
        const [ file ] = await connection.query('SELECT * FROM files WHERE files_registered = ?;', [ files_registered ]);
        //@ts-ignore
        postTraking(idfiles_states, file[0].idfiles, userSession, tracking_observation);
        // createPDF(files_registered.toUpperCase(), files_account_type.toUpperCase(), files_type.toUpperCase());
        return res.status(200).json({ error: false, tracking: "Cargado exitosamente", file });
    } catch (err) {
        // console.log(err);
        return res.status(508).json({ error: true, message:"Error del servidor para guardar los archivos" });
    };
};

// Editar un archivo
export const putFile = async ( req:Request, res:Response ) => {
    const { idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_cost_center, files_code_accounting, files_code_treasury, files_price,files_account_type, files_account_type_number,userSession, tracking_observation } = req.body;
    const values = [idfiles, idproviders, idusers, idfiles_states, files_type, files_registered, files_price, files_account_type, files_account_type_number, userSession, tracking_observation]
    try {
        if (missingData(values)){
            return res.status(422).json({error: true, message: "MISSING_VALUES"});
        };
        const [ data ] = await connection.query(`SELECT count(*) AS contador FROM files WHERE idfiles = ? OR files_registered = ?;`,
        [ idfiles, files_registered ]);
        // @ts-ignore
        if ( data[0].contador === 0 ) {
            return res.status(404).json({ error: true, message: `Archivo con el id: ${ idfiles } o radicado: ${ files_registered }, no se encuentra registrado en la base de datos` })
        };
        await connection.query(`
            UPDATE files SET
                idproviders = ?, 
                idusers = ?, 
                idfiles_states = ?, 
                files_type = ?,
                files_cost_center = ?, 
                files_code_accounting = ?, 
                files_code_treasury = ?, 
                files_price = ?,
                files_account_type = ?, 
                files_account_type_number = ?
                    WHERE idfiles = ? OR files_registered = ?;`,
                [ idproviders,
                idusers,
                idfiles_states,
                files_type.toUpperCase(),
                files_cost_center,
                files_code_accounting,
                files_code_treasury,
                files_price, 
                files_account_type.toUpperCase(), 
                files_account_type_number.toUpperCase(), 
                idfiles, files_registered ]);
        const [ fileUpdated ] = await connection.query(`
            SELECT * FROM files WHERE idfiles = ? OR files_registered = ?;`,
            [ idfiles, files_registered ]);
        postTraking(idfiles_states, idfiles, userSession, tracking_observation.toUpperCase());
        //@ts-ignore
        return res.status(200).json({ error: false, tracking: "Cargado exitosamente", fileUpdated });
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ error: true, message: "Error del servidor para edutar un archivo" })
    };
};

// Eliminar un archivo
export const deleteFile = async (req:Request, res:Response) => {
    const { api_key, files_registered } = req.body;
    const values = [ files_registered ]
    try {
        if( api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: true, message: "No cuentas con los permisos para eliminar un archivo" })
        };
        if (missingData(values)) {
            return res.status(422).json({error: true, message: "MISSING_VALUES"});
        };
        const [ data ] = await connection.query(`SELECT idfiles FROM files WHERE files_registered = ?;`, files_registered );
        //@ts-ignore
        if( data[0] === undefined ) {
            return res.status(508).json({error: true, message: `Radicado: ${files_registered}, no existe en el sistema`});
        }
        //@ts-ignore
        const idfiles = data[0].idfiles;
        await connection.query(`DELETE FROM tracking WHERE idfiles = ?;`, [ idfiles ]);
        // console.log("Eliminado del tracking");
        await connection.query(`DELETE FROM files_path WHERE idfiles = ?;`, [ idfiles ])
        // console.log("Eliminado de las rutas");
        await connection.query(`DELETE FROM files WHERE idfiles = ?;`, [ idfiles ]);
        // console.log("Eliminado del los archivos");
        return res.status(200).json({error: false, message: `Archivo con radicado: ${files_registered}, ha sido eliminado`})
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar un archivo" })
    };
};

