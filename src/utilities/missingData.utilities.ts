
type arrayMissing = string | number | undefined | null 

interface InfoMissing {
    error: boolean;
    missing?: string;
}

export const missingData = ( array: arrayMissing[] ): InfoMissing => {
    // for (let i = 0; i < array.length; i++) {
    //     if (array[i] === null || array[i] === undefined || array[i] === "") {
    //         return { error: true, missing: array[i] };
    //     };
    // };
    return { error: false };
};

export const missingDataObject = ( data: Object ): InfoMissing => {
    const arrayValues = Object.values(data)
    const arrayKeys = Object.keys(data)
    for (let i = 0; i < arrayValues.length; i++) {
        if (arrayValues[i] === null || arrayValues[i] === undefined || arrayValues[i] === "") {
            return { error: true, missing: arrayKeys[i] };
        };
    };
    return { error: false };
};