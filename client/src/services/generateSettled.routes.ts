import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getSettled = async () => {
  try {
    const response = await axios.get(Routes.api.generateSettled, getHeader());
    console.log("response: ", response);
    const settled = response.data.data;
    return settled;
  } catch (error) {
    console.log("error: ", error);
  }
};
