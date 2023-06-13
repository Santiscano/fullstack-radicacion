import { Request, Response, NextFunction } from "express";
import config from "../config/firebase/firebase.config";
import { errorMessage, success, unsuccessfully } from "../utilities/responses.utilities";

const refreshToken = async (token: any):Promise<string> => {
    try{
        const newToken =  await config.admin.auth().createCustomToken(token.uid);
        return newToken
    } catch(error){
        console.log('error: ', error);
        throw error
    }
};

export const decodeToken = async (_req: Request, res: Response, next: NextFunction) => {
    const token = _req.headers.authorization?.split(" ")[1];
    try {
        if (token === undefined) {
            return res.status(401).json(errorMessage("UNDEFINED_TOKEN_ACCESS"));
        };
        const decodeValue = await config.admin.auth().verifyIdToken(token!);
        // if (decodeValue != null || decodeValue != undefined) {
        //     return next();
        // };

        // verificar tiempo
        console.log('expired token', decodeValue.exp*1000)
        const expirationTime = decodeValue.exp * 1000;
        const currentTime = Date.now();
        console.log('currentTime: ', currentTime);
        const timeRemaining = expirationTime - currentTime;
        if (timeRemaining < -25200000) return res.status(401).json(errorMessage("TOKEN_EXPIRED"))
        if(timeRemaining < 3600000) { //900.000 es = 15min -- 1 hora 3´600.000
            console.log('token se actualizo');
            const newToken = await refreshToken(decodeValue); 
            console.log('newToken: ', newToken);
            // _req.headers.authorization = `Bearer ${newToken}`
            res.setHeader("new-Token", newToken);
        }
        return next();
    } catch (error: any) {
        if (error.errorInfo.code === "auth/id-token-expired") return res.status(401).json(errorMessage("TOKEN_EXPIRED"));
        if (error.errorInfo.code === "auth/argument-error") return res.status(401).json(errorMessage("INVALID_TOKEN_ACCESS"));
        return res.status(512).json(unsuccessfully(error));
    };
};