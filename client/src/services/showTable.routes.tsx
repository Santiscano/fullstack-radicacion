import axios from "axios";
import Routes from "./allRoutes";
import { get, getHeader } from "../components/tools/SesionSettings";
import { useContext } from "react";
import { GeneralValuesContext } from "../Context/GeneralValuesContext";

export const showTablePending = async () => {
  try {
    const response = await axios.post(
      Routes.api.tables.pending,
      {
        idusers: get("idusers"),
      },
      getHeader()
    );
    console.log("response showtablePending: ", response);
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

export const showTableAllFiles = async () => {
  try {
    const response = await axios.get(Routes.api.tables.allFiles, getHeader());
    console.log("response allTable: ", response);
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

export const operativeShowTable = async () => {
  try {
    const table = await axios.post(Routes.api.tables.operative, {
      idroles: Number(get("idroles"))
    }, getHeader());
    return table;
  } catch(error) {}
};

export const showTableHistory = async () => {
  try{
    const history = await axios.post(Routes.api.tables.history,{
      userSession: Number(get("idusers"))
    },getHeader())
    console.log('history: ', history)
    return history
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
