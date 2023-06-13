
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

interface Response {
    error: boolean;
    message: string;
    data?: Data | any;
    missing?: string | number | undefined | null;
    firebase?: {error: boolean, data: any};
    path?: Data;
    token?: string;
}

export const success = ( data?: Data | any, message?: string, firebase?: {error: boolean, data: any}, path?: Data ): Response => {
    message === undefined ? message = 'SUCCESS' : message;
    return { error: false, message, data, firebase, path };
};

export const unsuccessfully = ( error: unknown ): Response => {
    console.log(error);
    return { error: true, message: 'SERVER_PROBLEM'};
};

export const errorMessage = ( message: string ): Response => {
    return { error: true, message };
};

export const unauthorized = (): Response => {
    return { error: true, message: 'UNAUTHORIZED_KEY_ACCESS' };
};

export const updateToken = (token: string): Response => {
    return { error: false, message: 'UPDATE_TOKEN', token };
};

export const uncompleted = ( missing: string | undefined ): Response => {
    return { error: true, message: 'INCOMPLETE_INFORMATION', missing };
};