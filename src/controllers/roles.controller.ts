import { Request, Response } from 'express';
import { connection } from '../config/database/db';
import * as dotenv from 'dotenv'

dotenv.config();


// Traer roles GET
export const getRoles = async (req: Request, res: Response) =>{
    const { api_key } = req.body;
    try {
        if (api_key == process.env.API_KEY){
            const [ roles ] = await connection.query('SELECT * FROM roles;')
            return res.status(200).json({ roles });
        } else { 
            return res.status(401).json({ message: "No cuentas con los permisos para acceder a esta información"})
        };
    } catch (err) {
        // console.log(err);
        return res.status(508).json({ error: "Error del servidor al traer los roles" });
    };
};

// Crear rol POST
export const postRol = async ( req: Request, res: Response ) => {
    try {
        const { roles, roles_description } = req.body;
        const [ rol ] = await connection.query(`
            SELECT count(*) AS contador FROM roles WHERE roles = ?;
        `, roles);
        // @ts-ignore
        if ( rol[0].contador === 0 ) {
            await connection.query(`
                INSERT INTO roles (roles, roles_description)
                VALUES ( ?, ? );
                `, [roles.toUpperCase(), roles_description.toUpperCase()]);
            const [ rolCreated ] = await connection.query(`SELECT * FROM roles WHERE roles = ?`, [ roles.toUpperCase() ]);
            return res.status(200).json({message: `Rol creado satisfactoriamente`, rolCreated})
        } else {
            return res.status(201).json({message: `El rol: ${ roles }, ya existe en la base de datos`});
        }
    } catch (err) {
        // console.log(err);
        return res.status(508).json({ error: "Error del servidor al crear un rol" });
    };
};

// Editar roles PUT 
export const putRol = async (req: Request, res: Response) => {
    try {
        const { idroles, roles, roles_description } = req.body;
        const [ validate ] = await connection.query(`
            SELECT count(*) AS contador FROM roles WHERE idroles = ?;
        `, idroles );
        // @ts-ignore
        if( validate[0].contador === 0 ) {
            return res.status(201).json(`El rol con id:${ idroles }, no se encuentra registrado en la base de datos`)
        } else {
            await connection.query(`
                UPDATE roles SET roles = ?, roles_description = ? WHERE idroles = ?;
            `, [ roles_description.toUpperCase(), roles.toUpperCase(), idroles ]);
            const [ rol ] = await connection.query(`SELECT * FROM roles WHERE idroles = ?;`,[ idroles ]);
            return res.status(200).json({ menssage: `El rol: ${ idroles }, fue editado satisfactoriamente`, rol });
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json(`Error del servidor para editar el rol`);
    };
};

// Eliminar un rol DELETE
export const deleteRol = async (req: Request, res: Response) => {
    const { api_key, idroles } = req.body;
    try {
        if ( api_key === process.env.API_KEY ){
            const [ rolValidate ] = await connection.query(`SELECT * FROM roles WHERE idroles = ?;`, [ idroles ]);
            // @ts-ignore
            if ( rolValidate.length == 0){
                return res.status(201).json({ message: `El rol: ${ idroles }, no se encuetra regristrado en la base de datos` });
            } else {
                await connection.query(`DELETE FROM roles WHERE idroles = ?;`, [ idroles ]);
                return res.status(200).json({ message: `El rol: ${ idroles }, fue eliminado satisfactoriamente` });
            };
        } else {
            return res.status(401).json({ message: "No cuentas con los permisos para eliminar un rol" })
        };
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ Error: "Error del servidor para eliminar el rol" });
    };
};