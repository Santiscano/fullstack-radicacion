import 'dotenv/config';

// API_KEY
export const apiKeyValidate = ( apiKey: string | string[] | undefined ): boolean => {
    if( apiKey !== process.env.API_KEY ){
        return true             // CON ACCESO
    };
    return false                // SIN ACCESO
};