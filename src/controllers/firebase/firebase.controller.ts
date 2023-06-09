import express, { Request, Response } from "express";
import auth from '../../config/firebase/auth';
import jwt_decode from "jwt-decode";
import { errorMessage, success, unauthorized, uncompleted, unsuccessfully } from "../../utilities/responses.utilities";
import { validateUserModel, logInModel } from '../../models/firebase.model';
import { apiKeyValidate } from "../../utilities/apiKeyValidate.utilities";
import { missingData } from "../../utilities/missingData.utilities";

export const authRouter = express.Router();

authRouter.use(express.json());

// CREAR USUARIO / FIREBASE
export const createUser = async (req: Request, res: Response) => {
    try {
        const { users_email, users_password } = req.body;
        const result: any = await auth.createUser(users_email, users_password);
        if (result.error) return res.status(500).json(errorMessage(result.data.code));
        return res.status(200).json(success(result));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// LOGIN / FIREBASE
export const logIn = async (req: Request, res: Response) => {
    const { users_email, users_password } = req.body;
    const data = { users_email, users_password }
    try {
        if ( missingData(data).error ) return res.status(422).json(uncompleted(missingData(data).missing));
        const info: any = await logInModel(users_email);
        if (info.data[0] === undefined) return res.status(401).json(errorMessage("auth/user-not-found"));
        if (info.data[0].users_status !== "ACTIVO") return res.status(401).json(errorMessage("INACTIVE_USER"));
        const result: any = await auth.logIn(users_email, users_password);
        if ( result.error ) return res.status(401).json(errorMessage(result.data.code));
        return res.status(200).json(success(result.data.stsTokenManager));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};

// VALIDAR USUARIO / FIRABASE
export const validateUser = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if (token === undefined) return res.status(404).json(errorMessage("NOT_FOUND_TOKEN"));
        const decoded: any = jwt_decode(token);
        const emailToken: any = (Object.values(decoded))[7];
        const info = await validateUserModel(emailToken);
        return res.status(200).json(success(info.data, info.message))
    } catch(error){
        return res.status(512).json(errorMessage("INVALID_TOKEN"));
    };
};

// CAMBIAR CONTRASEÑA POR EMAIL / FIREBASE
export const changePassword = async (req:Request, res:Response) => {
    try {
        const { api_key } = req.headers;
        const { users_email } = req.body;
        if ( apiKeyValidate(api_key) ) return res.status(401).json(unauthorized());
        if ( missingData({users_email}).error ) return res.status(422).json(uncompleted(missingData({users_email}).missing));
        const result: any = await auth.sendPasswordEmail(users_email);
        return res.status(200).json(success(result));
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    };
};