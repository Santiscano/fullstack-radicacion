import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getStatesFiles = async () => {
  try {
    const response = await axios.get(
      Routes.api.stateFiles.getStateFiles,
      getHeader()
    );
    console.log("response getstatefiles: ", response);
    return response;
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

export const addStateFile = async () => {
  try {
    const response = await axios.post(
      Routes.api.stateFiles.addStateFile,
      {
        files_states: "PrUeba",
        files_states_description:
          "Documento ingresado por primera vez a la plataforma",
      },
      getHeader()
    );
    console.log("response: ", response);
    return response;
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
export const editStateFile = async () => {
  try {
    const response = await axios.put(
      Routes.api.stateFiles.editStateFile,
      {
        idfiles_states: 6,
        files_states: "Recaaaah",
        files_states_description:
          "Documento que no cumple con los criterios de la empresa",
      },
      getHeader()
    );
    // console.log("response: ", response);
    return response;
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
export const deleteStateFile = async () => {
  try {
    const response = await axios.delete(
      Routes.api.stateFiles.deleteStateFile,
      getHeader()
    );
    // console.log("response: ", response);
    return response;
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
