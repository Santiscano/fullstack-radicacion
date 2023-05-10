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
  } catch (error) {
    console.log("error: ", error);
  }
};

export const showTableAllFiles = async () => {
  try {
    const response = await axios.get(Routes.api.tables.allFiles, getHeader());
    console.log("response allTable: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const showTableHistory = async () => {
  try{
    const history = await axios.post(Routes.api.tables.history,{
      tracking_user: Number(get("idusers"))
    },getHeader())
    console.log('history: ', history)
    return history
  } catch(error){
    console.log('history error: ', error)
  }
};
