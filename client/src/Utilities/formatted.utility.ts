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
  if(text == null){
    return ' '
  }
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

/**
 * metodo transformacion de fecha
 * @param fecha 2023-05-10T15:11:14.000Z
 * @returns 10 de mayo, 0:55 p. m.
 */
export function formatearFecha(fecha:any) {
  const fecha_dt = new Date(fecha);
  const opciones = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  // @ts-ignore
  const fecha_formateada = fecha_dt.toLocaleString('es-ES', opciones);
  return fecha_formateada;
}

/**
 * metodo transformacion de fecha
 * @param fecha 2023-05-10T15:11:14.000Z
 * @returns 10 de mayo 2023.
 */
export function formateData(fecha:any) {
  const fecha_dt = new Date(fecha);
  const opciones = {
    day: 'numeric',
    month: 'long',
    year: 'numeric', // Agregamos el año
  };
  // @ts-ignore
  const fecha_formateada = fecha_dt.toLocaleString('es-ES', opciones);
  return fecha_formateada;
}

/**
 * transforma en formato YYYY-MM-DD
 * @param fileName fecha rara "2122-12-12T05:00:00.000Z"
 * @returns
 */
export const cleanFileName = (fileName: string) => {
  if(fileName == null) return null;
  const file = fileName.split('T').shift();
  return file
};
