import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getRoles = async () => {
  try {
    const response = await axios.get(Routes.api.roles.get, getHeader());
    console.log('get roles: ', response.data);
    const roles = response.data;
    return roles;
  } catch (error) {
    console.log(error);
  }
};

export const createRol = async (rol: string, description: string) => {
  try {
    const response = await axios.post(
      Routes.api.roles.create,
      {
        roles: rol,
        roles_description: description,
      },
      getHeader()
    );
    console.log("response createRol: ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editRol = async () => {
  try {
    const response = await axios.put(
      Routes.api.roles.edit,
      {
        idroles: 10,
        roles: "frontEndRol",
        roles_description: "Equipo de el verguero",
      },
      getHeader()
    );
    // console.log('response: ', response);
    return response;
  } catch (error) {
    // console.log(error)
  }
};

export const deleteRol = async () => {
  try {
    const response = await axios.post(Routes.api.roles.delete, {
      headers: {
        api_key: import.meta.env.VITE_API_KEY,
      },
      data: {
        idroles: 10,
      },
    });
    console.log("response delete: ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
