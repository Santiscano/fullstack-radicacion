import axios from "axios";
import { getCedis } from "./Cedis.routes";
import { getHeader, set } from "../components/tools/SesionSettings";

const server = "http://localhost:4500";

export let payload: any;

export const getRoutes = async () => {
  try {
    const response = await axios.get(`${server}/routerApi`, getHeader());
    const rutas = response.data.rutas;
    payload = rutas;
    // console.log('payload: ', payload);
    // await getCedis();
    return payload;
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
