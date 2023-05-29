import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";
import { useAppSelector } from "../redux/hooks/useStore";

export const validateUser = async () => {
  try {
    const response = await axios.post(
      Routes.api.users.validate,
      {
        api_key: "37323a416eb548626b3e668255c4d436",
        users_email: "santiago.sierra@teclab.com.co",
        users_password: "1234",
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

export const getUsers = async () => {
  try {
    const response = await axios.get(Routes.api.users.getUsers, getHeader());
    const users = response.data.data;
    console.log("users: ", users);
    return users;
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

export const getUsersNotAdminProv = async () => {
  try{
    const getUsersNotAdminProv = await axios.get(Routes.api.users.notAdminProv, getHeader());
    const users = getUsersNotAdminProv.data.data;
    return users;
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

export const createUser = async (idroles: number, idsedes: number, users_identification_type: string, users_identification: string, name: string, lastname: string, address: string, phone: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      Routes.api.users.createUser,
      {
        idroles,
        idsedes,
        users_identification_type,
        users_identification,
        users_name: name,
        users_lastname: lastname,
        users_address: address,
        users_phone: phone,
        users_email: email,
        users_password: password,
        users_providers_paydays: null,
        users_providers_expiration_date: null,
      },
      getHeader()
    );
    console.log("create user: ", response);
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
export const editUser = async () => {
  try {
    const response = await axios.put(Routes.api.users.editUser, {
      idusers: 19,
      idroles: 6,
      idsedes: 1,
      users_identification_type: "PASAPORTE",
      users_identification: "123456789",
      users_identification_digital_check: "6",
      users_name: "FRONTEND",
      users_lastname: "REACT ANGULAR",
      users_address: "CODIGO HACK",
      users_phone: "3045435131",
      users_email: "react@angular.javascript.css",
      users_password: "123456",
      users_providers_paydays: null,
      users_providers_expiration_date: null,
      users_status: "ACTIVO",
    });
    console.log("response edit user: ", response);
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
export const createProvider = async (
  idroles: number,
  idsedes: number,
  users_identification_type: string,
  users_identification: string,
  users_name: string,
  users_address: string,
  users_phone: string,
  users_email: string,
  users_providers_paydays: number | undefined,
  users_providers_expiration_date: Date | undefined
) => {
  try {
    const response = await axios.post(
      Routes.api.users.createUser,
      {
        idroles,
        idsedes,
        users_identification_type,
        users_identification,
        users_name,
        users_address,
        users_phone,
        users_email,
        users_providers_paydays,
        users_providers_expiration_date,
      },
      getHeader()
    );
    console.log("create user: ", response);
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
export const updateProvider = async () => {
  const user = useAppSelector((state) => state.modalUserViewSlice)
  try{
    const updateProv = await axios.put(Routes.api.users.editUser, {
      idusers: user.idusers,
      idroles: 1,
      idsedes: user.idsedes,
      users_identification_type: user.users_identification_type,
      users_identification: user.users_identification,
      users_identification_digital_check: user.users_identification_digital_check,
      users_name: user.users_name,
      users_lastname: user.users_lastname,
      users_address: user.users_address,
      users_phone: user.users_phone,
      users_email: user.users_email,
      users_providers_paydays: user.users_providers_paydays,
      users_providers_expiration_date: user.users_providers_expiration_date,
      users_status: user.users_status,
    }, getHeader())
    return updateProv
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



export const deleteUser = async () => {
  try {
    const response = await axios.delete(
      Routes.api.users.deleteUser,
      getHeader()
    );
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
