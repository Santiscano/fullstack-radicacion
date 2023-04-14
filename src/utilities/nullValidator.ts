
export const nullValidator = ( array: ( string | number | undefined | null | Date )[] ): boolean => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === null || array[i] === undefined || array[i] === "") {
            return true;
        };
    };
    return false;
};