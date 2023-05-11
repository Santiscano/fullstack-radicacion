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
  } catch (error) {
    console.log("error", error);
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
  } catch (error) {
    console.log("error", error);
  }
};

export const GetAllSettled = async () => {
  try {
    const response = await axios.get(
      Routes.api.searchingFile.getAllSettled,
      getHeader()
    );
    console.log("response: ", response);
    return response;
  } catch (error:any) {
    console.log("error axios: ", error);
    // handleMessageSnackbar("error",)
    return error;
  }
};
