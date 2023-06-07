import axios from "axios";
import Routes from "./allRoutes";
import { getHeader } from "../components/tools/SesionSettings";
import useContextProvider from "../Context/GeneralValuesContext";


export const SearchWithSettled = async (files_registered: any) => {
  try {
    console.log("se activo withsettled", files_registered);
    const response = await axios.post(
      Routes.api.searchingFile.withSettled,
      {
        files_registered,
      },
      getHeader()
    );
    console.log("response searchWithSettled: ", response);
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

export const SearchWithDocument = async (
  files_account_type: any,
  files_account_type_number: any
) => {
  try {
    console.log(
      "searchwithdocument activo",
      files_account_type,
      files_account_type_number
    );
    const response = await axios.post(
      Routes.api.searchingFile.withDocument,
      {
        files_account_type,
        files_account_type_number,
      },
      getHeader()
    );
    console.log("searchWithdocument response: ", response);
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

export const GetAllSettled = async (remove:any, navigate:any) => {
  try {
    const response = await axios.get(
      Routes.api.searchingFile.getAllSettled,
      getHeader()
    );
    console.log("response: ", response);
    return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado getallsettled",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      remove("accessToken")
      navigate("/login")
    }
  }
};
