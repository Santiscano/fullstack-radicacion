import Modal from "@mui/material/Modal";
import axios from "axios";
import Routes from "./Routes";
import { get, getHeader, set } from "../components/tools/SesionSettings";

export const getFiles = async () => {
  try {
    const response = await axios.post(
      Routes.api.files.getFiles,
      {
        api_key: import.meta.env.VITE_API_KEY,
      },
      getHeader()
    );
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const addFile = async (
  idUser: number,
  settledNumber: string,
  price: string,
  redirectTo: number,
  idsedes: number,
  files_account_type: any,
  files_account_type_number: any,
  IdUserSession: number
) => {
  try {
    console.log(
      "info que envio: settledNumber: ",
      settledNumber,
      price,
      redirectTo,
      idsedes
    );
    const response = await axios.post(
      Routes.api.files.addFile,
      {
        files_registered: settledNumber,
        idsedes: idsedes,
        idproviders: idUser,
        idusers: redirectTo,
        files_type: "ADMINISTRATIVO",
        files_price: price,
        files_account_type: files_account_type,
        files_account_type_number: files_account_type_number,
        userSession: IdUserSession,
      },
      getHeader()
    );
    // console.log('response: ', response);
    return response;
  } catch (error) {
    console.log("error: ", error);
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
    console.log(
      "lo que estoy mandando a pufile:",
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
      tracking_observation,
      get("idusers")
    );
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
        tracking_observation,
        userSession: get("idusers"),
      },
      getHeader()
    );
    console.log("response putfile", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
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
  } catch (error) {
    console.log("error: ", error);
  }
};
