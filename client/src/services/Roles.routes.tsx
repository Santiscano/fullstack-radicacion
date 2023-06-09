import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getRoles = async () => {
  try {
    const getRoles = await axios.get(Routes.api.roles.get, getHeader());
    console.log('get roles: ', getRoles.data);
    const roles = getRoles.data;
    return roles;
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

export const getNotAdminProv = async () => {
  try {
    const getAdminProv = await axios.get(Routes.api.roles.notAdminProv, getHeader());
    console.log('get admin prov: ', getAdminProv.data);
    const adminProv = getAdminProv.data;
    return adminProv;
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

export const getProvider = async () => {
  try{
    const getProvider = await axios.get(Routes.api.roles.provider, getHeader());
    console.log('get provider: ', getProvider.data);
    const provider = getProvider.data;
    return provider;
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
