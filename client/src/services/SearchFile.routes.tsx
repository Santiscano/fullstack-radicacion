import axios from "axios";
import Routes from "./Routes";
import { getHeader } from "../components/tools/SesionSettings";

export const SearchWithSettled = async (settled: any) => {
  try {
    // console.log("se activo withsettled");
    const response = await axios.post(
      Routes.api.searchingFile.withSettled,
      {
        api_key: import.meta.env.VITE_API_KEY,
        files_registered: settled,
      },
      getHeader()
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const SearchWithDocument = async (
  accountType: any,
  accountNumber: any
) => {
  try {
    const response = await axios.post(
      Routes.api.searchingFile.withDocument,
      {
        api_key: import.meta.env.VITE_API_KEY,
        files_account_type: accountType,
        files_account_type_number: accountNumber,
      },
      getHeader()
    );
    // console.log("res:", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetAllSettled = async () => {
  try {
    const response = await axios.post(
      Routes.api.searchingFile.getAllSettled,
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
