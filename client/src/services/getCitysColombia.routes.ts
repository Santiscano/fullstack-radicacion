import axios from "axios";

// https://www.datos.gov.co/resource/xdk5-pm3f.json

export const getCitys = async () => {
  try {
    const response = await axios.get(
      "https://www.datos.gov.co/resource/xdk5-pm3f.json"
    );
    // departamentos
    const responseDep = response!.data.map((item: any) => {
      return item.departamento;
    });
    const Department = responseDep.filter((item: any, index: any) => {
      return responseDep.indexOf(item) === index;
    });
    // ciudades
    const DepartamentCity = response!.data.map((item: any) => {
      return { departamento: item.departamento, municipio: item.municipio };
    });

    return { Department, DepartamentCity };
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
