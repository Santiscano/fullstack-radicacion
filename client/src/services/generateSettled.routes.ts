import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getSettled = async () => {
  try {
    const response = await axios.get(Routes.api.generateSettled, getHeader());
    console.log("response: ", response);
    const settled = response.data.data;
    return settled;
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
