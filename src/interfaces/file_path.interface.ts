import { Request, Response } from "express";

type ParamsDictionary = /*unresolved*/ any
type ParsedQs = /*unresolved*/ any

export interface FilePath {
    idfiles: number;
    files_path: string;
    files_path_observation: string; 
    userSession: number;
};

export interface FilePathUpload extends FilePath {
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
    res: Response
};