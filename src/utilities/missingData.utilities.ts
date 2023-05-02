
interface InfoMissing {
    error: boolean;
    missing?: string;
}

export const missingData = ( data: Object ): InfoMissing => {
    const arrayValues = Object.values(data)
    const arrayKeys = Object.keys(data)
    for (let i = 0; i < arrayValues.length; i++) {
        if (arrayValues[i] === null || arrayValues[i] === undefined || arrayValues[i] === "") {
            return { error: true, missing: arrayKeys[i] };
        };
    };
    return { error: false };
};