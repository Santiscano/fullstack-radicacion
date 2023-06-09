import Modal from "@mui/material/Modal";
import axios from "axios";
import Routes from "./allRoutes";
import { get, getHeader, set } from "../components/tools/SesionSettings";
import { selectCase } from "../components/tools/switchCaseInput";

export const getFiles = async () => {
  try {
    const response = await axios.post(
      Routes.api.files.getFiles,
      {},
      getHeader()
    );
    console.log("response : ", response);
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

export const addFile = async (
  idproviders: number,
  files_registered: string,
  files_price: string,
  idusers: number,
  idsedes: number,
  files_type: string,
  files_account_type: any,
  unitedValues: any,
  userSession: number,
  handleMessageSnackbar?: any,
  remove?:any,
  navigate?:any,
) => {
  try {
    console.log('redirectToID:',idusers)
    const files_account_type_number = unitedValues == "-" ? "" : unitedValues;
    const response = await axios.post(
      Routes.api.files.addFile,
      {
        files_registered,
        idsedes,
        idproviders,
        idusers,
        files_type,
        files_price,
        files_account_type,
        files_account_type_number,
        userSession,
      },
      getHeader()
    );
    console.log("response addFile: ", response);
    return response;
  } catch (err) {
    // @ts-ignore
    const missing = selectCase(err.response.data.missing);
    // @ts-ignore
    const info =  err.response.data.message == 'INCOMPLETE_INFORMATION'
      ? `${missing} INCOMPLETO.`
      // @ts-ignore
      : err.response.data.message;
    handleMessageSnackbar("error", info );
    // @ts-ignore
    console.log("error ejected",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      remove("accessToken");
      navigate("/login");
    }
  }
};

export const editFile = async (
  idfiles: number,
  idproviders: number,
  idusers: number | null,
  idfiles_states: number,
  files_type: string,
  files_registered: string,
  files_cost_center: any,
  files_code_accounting: string,
  files_code_treasury: string,
  files_price: number,
  files_account_type: string,
  files_account_type_number: string,
  tracking_observation: string
) => {
  try {
    const response = await axios.put(
      Routes.api.files.editFile,
      {
        idfiles,
        idproviders,
        idusers,
        idfiles_states,
        files_type,
        files_registered,
        files_cost_center,
        files_code_accounting,
        files_code_treasury,
        files_price,
        files_account_type,
        files_account_type_number,
        userSession: get("idusers"),
        tracking_observation,
      },
      getHeader()
    );
    console.log("response putfile", response);
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

export const deleteFile = async (files_registered: string) => {
  try {
    const response = await axios.post(
      Routes.api.files.deleteFile,
      {
        api_key: import.meta.env.VITE_API_KEY,
        files_registered,
      },
      getHeader()
    );
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
