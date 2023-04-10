import axios from "axios";
import Routes from "./Routes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getSettled = async () => {
  try {
    const response = await axios.post(
      Routes.api.generateSettled,
      {
        api_key: import.meta.env.VITE_API_KEY,
      },
      getHeader()
    );
    const settled = response.data.result;
    return settled;
  } catch (error) {
    console.log("error: ", error);
  }
};
