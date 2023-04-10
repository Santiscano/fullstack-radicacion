import axios from "axios";
import Routes from './Routes';
import { getHeader, set } from "../components/tools/SesionSettings";

// https://www.datos.gov.co/resource/xdk5-pm3f.json

export const getCitys = async () => {
  try{
    const response = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json')
    // departamentos
    const responseDep = response!.data.map((item:any) => {
      return item.departamento
    });
    const Department = responseDep.filter((item:any, index:any) => {
      return responseDep.indexOf(item) === index
    })
    // ciudades
    const DepartamentCity = response!.data.map((item:any) => {
      return {departamento: item.departamento, municipio: item.municipio}
    });
    return {Department, DepartamentCity};
  } catch(error){
    console.log('error: ', error);
  }
};

