import 'dotenv/config';

// VALIDAR API_KEY
export const apiKeyValidate = ( apiKey: string | string[] | undefined ): boolean => {
    if( apiKey !== process.env.API_KEY ){
        return true             // SIN ACCESO
    };
    return false                // TIENE ACCESO
};