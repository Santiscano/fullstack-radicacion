import { Request, Response, NextFunction } from "express";
import { errorMessage, unauthorized, unsuccessfully } from "../utilities/responses.utilities";
import { apiKeyValidate } from "../utilities/apiKeyValidate.utilities";

export const validateApikey = (req:Request, res:Response, next:NextFunction) => {
    const { api_key } = req.headers;
    try{
        if (apiKeyValidate(api_key)) return res.status(401).json(unauthorized());
        return next();
    } catch(error) {
        return res.status(512).json(unsuccessfully(error));
    }
};
