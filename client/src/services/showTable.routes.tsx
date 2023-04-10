import axios from "axios";
import Routes from "./Routes";
import { get, getHeader } from "../components/tools/SesionSettings";
import { useContext } from "react";
import { GeneralValuesContext } from "../Context/GeneralValuesContext";

export const showTablePending = async () => {
  try {
    const response = await axios.post(
      Routes.api.tables.pending,
      {
        api_key: import.meta.env.VITE_API_KEY,
        idusers: get("idusers"),
      },
      getHeader()
    );
    // console.log("response showtablePending: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const showTableAllFiles = async () => {
  try {
    const response = await axios.post(
      Routes.api.tables.allFiles,
      {
        api_key: import.meta.env.VITE_API_KEY,
      },
      getHeader()
    );
    // console.log('response row: ', response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};
