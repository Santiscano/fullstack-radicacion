
export const twoCharactersValidator = ( data: number ): string => {
    const regex = /[a-zA-Z]/g;
    const value = Number(data);

    if (value >= 100 || value <= 0 || regex.test(value.toString()) || value.toString().length > 3 ){
        return `INVALID_VALUED`
    } else if ( value < 10 ) {
        return `0${value.toString()}`
    } else {
        return value.toString();
    };
};