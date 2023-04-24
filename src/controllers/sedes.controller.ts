import 'dotenv/config';
import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import { missingData, missingDataObject } from '../utilities/missingData.utilities';
import { apiKeyValidate } from '../utilities/apiKeyValidate.utilities';
import { success, unauthorized, uncompleted, unsuccessfully } from '../utilities/responses.utilities';
import { getSedesModel, postSedeModel } from '../models/sedes.model';


// TRAER CEDIS
export const getSedes = async ( req: Request, res: Response ) =>{
    const { api_key } = req.headers;
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return res.status(200).json(success((await getSedesModel()).data));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// CREAR CEDI
export const postSede = async ( req: Request, res: Response ) => {
    const { api_key } = req.headers;
    const { sedes_country, sedes_state, sedes_city, sedes_address, sedes_name, sedes_type} = req.body;
    const values = { sedes_country, sedes_state, sedes_city, sedes_address, sedes_name, sedes_type };
    try {
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        if (missingDataObject(values).error) return res.status(422).json(uncompleted(missingDataObject(values).missing));
        const info = await postSedeModel(values)
        return res.status(200).json(success(info.data, info.message));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// Editar sedes PUT
export const putSede =async ( req: Request, res: Response ) => {
    const { idsedes, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state } = req.body;
    const values = [ idsedes, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state ];
    try {
        if (missingData(values)) {
            return res.status(500).json({ error: true, message: "MISSING_VALUES" });
        };
        const [ validatePut ] = await connection.query('SELECT count(*) AS contador FROM sedes WHERE idsedes = ?;', [ idsedes ]);
        // @ts-ignore
        if(validatePut[0].contador === 0){
            return res.status(201).json({ message: `La empresa con id: ${ idsedes }, no se encuentra registrada en la base de datos` });
        } else {
            await connection.query(`
                    UPDATE sedes SET sedes_city = ?, sedes_country = ?, sedes_state = ?, sedes_address = ?, sedes_name = ?, sedes_type = ? WHERE idsedes = ?;
                `, [ sedes_city.toUpperCase(), 
                    sedes_country.toUpperCase(),
                    sedes_state.toUpperCase(),
                    sedes_address.toUpperCase(), 
                    sedes_name.toUpperCase(), 
                    sedes_type.toUpperCase(), 
                    idsedes ]);
            const [ sede ] = await connection.query(`SELECT * FROM sedes WHERE idsedes = ?;`, [ idsedes ]);
            return res.status(200).json({ error: false, message:"Sede editada satisfactoriamente", Edited: sede });
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para editar una sede" });
    };
};

// Eliminar una sede DELETE
export const deleteSede = async ( req: Request, res: Response ) => {
    const { api_key, idsedes } = req.body;
    try {
        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ message: "No cuentas con los permisos para eliminar una sede" });
        };
        const [ validateDelete ] = await connection.query(`SELECT count(*) AS contador FROM sedes WHERE idsedes = ?;`, [ idsedes ]);
        //@ts-ignore
        if ( validateDelete[0].contador === 0 ) {
            return res.status(404).json({ message: `La sede con id: ${ idsedes }, no se encuentra registrada en la base de datos` });
        } else {
            await connection.query(`DELETE FROM sedes WHERE idsedes = ?;`, [ idsedes ]);
            return res.status(200).json( { error: false, message: `Sede con id: ${ idsedes }, eliminada satisfactoriamente` } );
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ error: true, message: "Error del servidor para eliminar un servidor" });
    };
};