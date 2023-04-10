/**
 * metodo para formatear los numeros a dinero "COP"
 * @param amount numero a formatear
 * @returns fecha formateada
 */
export const  formattedAmount = (amount:any) => {
  // console.log('amount: ', amount);
  const numericAmount = parseFloat(amount);
  // console.log('numericAmount: ', numericAmount);
  const formatted = numericAmount.toLocaleString('es-CO',{
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
  // console.log('formatted: ', formatted);
  return formatted;
}

/**
 * convierte la Primer letra en mayuscula y todas las demas en minusculas
 * @param text palabra a convertir
 * @returns resultado convertido
 */
export function capitalizeFirstLatterUppercase(text: string): string {
  const words = text.toLowerCase().split(' ');
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  })
  return capitalizedWords.join(' ');
}

export function numberToStringWithTwoDigitNumber(num: number): string {
  return num < 10 ? `0${num.toString()}` : num.toString();
};

export function genereDateNowDMYHM() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedTime = date.toLocaleString("en-US", options);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year.toString()}`;

    return `${formattedDate} - ${formattedTime}`;
  };
