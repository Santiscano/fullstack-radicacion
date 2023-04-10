/**
 * convierte la Primer letra en mayuscula y todas las demas en minusculas
 * @param text palabra a convertir
 * @returns resultado convertido
 */
export const firstCapitalLetter = (text: string): string => {
    const words = text.toLowerCase().split(' ');
    const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
};