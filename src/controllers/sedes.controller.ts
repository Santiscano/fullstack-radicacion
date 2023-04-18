import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import 'dotenv/config';
import { nullValidator } from '../utilities/nullValidator';


// Traer sedes GET
export const getSedes = async ( req: Request, res: Response ) =>{
    const { api_key } = req.body;
    try {
        if (api_key !== process.env.API_KEY){
            return res.status(401).json({error:true, meesage: "No cuentas con los permisos para acceder a esta información"});
        };
        const [ sedes ] = await connection.query('SELECT * FROM sedes;');
        return res.status(200).json(sedes);
    } catch (err) {
        // console.log(err);
        return res.status(508).json({error: "Error del servidor al traer los sedes"});
    };
};

// Crear sedes POST
export const postSede = async ( req: Request, res: Response ) => {
    let { api_key, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state } = req.body;
    const values = [ sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state ];
    try {
        if (api_key !== process.env.API_KEY){
            return res.status(401).json({error:true, meesage: "No cuentas con los permisos para acceder a esta información"});
        };
        if (nullValidator(values)) {
            return res.status(500).json({ error: true, message: "MISSING_VALUES" });
        };
        const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM sedes WHERE sedes_city = ? AND sedes_address = ?;`,
            [sedes_city, sedes_address]);
        //@ts-ignore
        if ( validate[0].contador !== 0){
            return res.status(201).json({error: true, message: `La Sede en la ciudad: ${sedes_city} y con dirección: ${sedes_address}, ya se encuentra registrada`});
        };
        await connection.query(`
            INSERT INTO sedes (sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state)
                VALUES ( ?, ?, ?, ?, ?, ? );
        `, [ sedes_city.toUpperCase(), sedes_country.toUpperCase(), sedes_address.toUpperCase(), sedes_name.toUpperCase(), sedes_type.toUpperCase(), sedes_state.toUpperCase() ]);
        const [ sedes ] = await connection.query(`
                SELECT * FROM sedes WHERE sedes_address = ? AND sedes_city = ?;`, 
            [ sedes_address.toUpperCase(), sedes_city.toUpperCase() ])
        return res.status(200).json({error: false, message: "Sede creada satisfactoriamente", created: sedes});
    } catch (error) {
        // console.log(error)
        return res.status(508).json({ error: true, message: "Error del servidor para crear una sede" });
    };
};

// Editar sedes PUT
export const putSede =async ( req: Request, res: Response ) => {
    const { idsedes, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state } = req.body;
    const values = [ idsedes, sedes_city, sedes_country, sedes_address, sedes_name, sedes_type, sedes_state ];
    try {
        if (nullValidator(values)) {
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