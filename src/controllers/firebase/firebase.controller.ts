import express, { Request, Response } from "express";
import auth from '../../config/firebase/auth';
import { connection } from "../../config/database/db"
import jwt_decode from "jwt-decode";

export const authRouter = express.Router();

authRouter.use(express.json());

export const createUser = async (req: Request, res: Response) => {
    try {
        const { users_email, users_password } = req.body;
        const result = await auth.createUser(users_email, users_password);
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    };
};

export const logIn = async (req: Request, res: Response) => {
    try {
        const { users_email, users_password } = req.body;
        const result: any = await auth.logIn(users_email, users_password);
        if ( !result.error ) {
            return res.status(200).json(result)
        };
        return res.status(201).json({ error: true, message: result.data.code }); 
    } catch (error) {
        // console.log(error);
        return res.status(500).json(error);
    };
};

export const validateUser = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        //@ts-ignore
        let  decoded = jwt_decode(token);
        //@ts-ignore
        let emailToken = (Object.values(decoded))[7];
        let [ result ] = await connection.query(`
            SELECT U.idusers, U.idroles, U.idsedes, U.users_identification_type, U.users_identification, U.users_name, U.users_lastname, U.users_email, U.users_status, 
                R.roles, 
                S.sedes_city, 
                S.sedes_name 
                    FROM users U 
                    LEFT JOIN roles R ON U.idroles = R.idroles 
                    LEFT JOIN sedes S ON U.idsedes = S.idsedes 
                    WHERE users_status = 'ACTIVO' AND users_email = ? ;`, [ emailToken ]);
        // console.log(result)
        //@ts-ignore
        if(result.length == 0){
            return res.status(401).json([{email: emailToken, message: "Usuario registrado en Firebase, pero no existe en la base de datos" }]);
        };
        //@ts-ignore
        return res.status(201).json(result[0]);
    } catch(error){
        // console.log(error)
        return res.status(401).json({ message: "Token no válido" });
    };
};

export const changePassword = async (req:Request, res:Response) => {
    try {
        const { users_email } = req.body;
        const result = await auth.sendPasswordEmail(users_email);
        return res.status(201).send(result);
    } catch (error) {
        // console.log(error);
        return res.status(508).json({ message: "Error del servidor para cambiar la contraseña del usuario" })
    }
}