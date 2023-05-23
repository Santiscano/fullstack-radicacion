import axios from "axios";
import { getHeader, set } from "../components/tools/SesionSettings";
import Routes from "./allRoutes";

export const createUser = async (
  users_email: string,
  users_password: string
) => {
  try {
    const response = await axios.post(
      Routes.api.firebase.createUser,
      {
        users_email,
        users_password,
      },
      getHeader()
    );
    console.log("response: ", response);
  } catch (error) {
    console.log("error: ", error);
  }
};

// @ts-ignore
export const login = async (users_email: string, users_password: string) => {
  try {
    const response = await axios.post(
      Routes.api.firebase.login,
      {
        users_email,
        users_password,
      },
      getHeader()
    );
    console.log("res login: ", response.data.data.accessToken);
    const { accessToken } = response?.data.data;
    // console.log('accessToken: ', accessToken);
    set("accessToken", accessToken);
    return response;
  } catch (err: any) {
    const response = err.response;
    console.log("response: ", response);
    return response;
  }
};

export const validateUserFirebase = async () => {
  try {
    const response = await axios.post(Routes.api.firebase.validateUser,{},getHeader());
    console.log("response: ", response);
    const user = response?.data.data;
    set("user", user);
    set("idusers", user.idusers);
    set("idroles", user.idroles);
    set("idsedes", user.idsedes);
    set("fullName", `${user.users_name} ${user.users_lastname}`);
    console.log("user save in sesionStorage: ", user);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const changePassword = async (users_email: string) => {
  try {
    const response = await axios.post(
      Routes.api.firebase.changePassword,
      {
        users_email,
      },
      getHeader()
    );
    console.log("response: ", response);
    return response;
  } catch (error) {}
};
