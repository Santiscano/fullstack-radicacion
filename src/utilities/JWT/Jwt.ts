import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { errorMessage, unsuccessfully } from "../responses.utilities";

export const createJWT = (datos: Object) => {
    const timer = Date.now() + 1000 * 60 * 60 * 8;          // (milisegundos/seg * seg/min * min/h * HORAS ) 
    return jwt.sign({ datos, exp: timer }, process.env.JWT_SECRET_KEY!);
}

export const verifyAuthJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const payload: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        if (Date.now() > payload.exp) {
            return res.status(401).json(errorMessage("Token expirado"));
        }
        next();
    } catch (error) {
        return res.status(512).json(unsuccessfully(error));
    }
}



// como utilizar createJWT
// const token = JWT.createJWT({ userId: 1, username: "santiago" });
// ------------------------------------------------
// import JWT from "../helpers/Jwt.js";

// como utilizar verifyAuthJWT
// router.use(JWT.verifyAuthJWT);
