import axios from "axios";
import Routes from "./Routes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getStatesFiles = async () => {
  try {
    const response = await axios.post(
      Routes.api.stateFiles.getStateFiles,
      {
        api_key: import.meta.env.VITE_API_KEY,
      },
      getHeader()
    );
    // console.log("response: ", response.data);
    return response;
  } catch (error) {
    console.log("error: ", error);
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
  } catch (error) {
    console.log("error: ", error);
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
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};
export const deleteStateFile = async () => {
  try {
    const response = await axios.delete(
      Routes.api.stateFiles.deleteStateFile,
      getHeader()
    );
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};
