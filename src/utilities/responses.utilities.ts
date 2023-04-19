
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

type Data = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

interface response {
    error: boolean;
    message: string;
    data?: Data;
}

export const success = ( data: Data, message?: string ): response => {
    message === undefined ? message = 'SUCCESS' : message;
    return { error: false, message, data };
};

export const unsuccessfully = ( error: unknown ): response => {
    console.log(error);
    return { error: true, message: 'SERVER_PROBLEM' };
};

export const unauthorized = (): response => {
    return { error: true, message: 'UNAUTHORIZED_ACCESS' };
};

export const uncompleted = (): response => {
    return { error: true, message: 'INCOMPLETE_INFORMATION' };
};