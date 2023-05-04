import { Request, Response, NextFunction } from "express";
import config from "../config/firebase/firebase.config";
import { errorMessage, unsuccessfully } from "../utilities/responses.utilities";

export const decodeToken = async (_req: Request, res: Response, next: NextFunction) => {
    const token = _req.headers.authorization?.split(" ")[1];
    try {
        if (token === undefined) {
            return res.status(401).json(errorMessage("UNDEFINED_TOKEN_ACCESS"));
        };
        const decodeValue = await config.admin.auth().verifyIdToken(token!);
        if (decodeValue != null || decodeValue != undefined) {
            return next();
        };
    } catch (error: any) {
        if (error.errorInfo.code === "auth/id-token-expired") {
            return res.status(401).json(errorMessage("TOKEN_EXPIRED"));
        } else if (error.errorInfo.code === "auth/argument-error") {
            return res.status(401).json(errorMessage("INVALID_TOKEN_ACCESS"));
        } else {
            return res.status(512).json(unsuccessfully(error));
        };
    };
};