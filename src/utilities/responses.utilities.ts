
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

interface Response {
    error: boolean;
    message: string;
    data?: Data;
    missing?: string | number | undefined | null;
    firebase?: Data
}

export const success = ( data?: Data, message?: string, firebase?: Data  ): Response => {
    message === undefined ? message = 'SUCCESS' : message;
    return { error: false, message, data, firebase };
};

export const unsuccessfully = ( error: unknown ): Response => {
    console.log(error);
    return { error: true, message: 'SERVER_PROBLEM' };
};

export const unauthorized = (): Response => {
    return { error: true, message: 'UNAUTHORIZED_ACCESS' };
};

export const uncompleted = ( missing: string | undefined ): Response => {
    return { error: true, message: 'INCOMPLETE_INFORMATION', missing };
};