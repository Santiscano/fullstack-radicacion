import axios from "axios";
import { getHeader, set } from "../components/tools/SesionSettings";
import Routes from './Routes';


export const createUser = async (users_email:string, users_password:string) => {
  try{
    const response = await axios.post(Routes.api.firebase.createUser,{
      users_email,
      users_password,
    },getHeader())
    console.log('response: ', response);
  } catch(error) {
    console.log('error: ', error);
  }
}

// export const login = (users_email:string, users_password:string) => {
//   const form = new FormData();
//   form.append("users_email", users_email)
//   form.append("users_password", users_password)
//   axios.post(Routes.api.firebase.login, form,getHeader()).then((response) => {
//     console.log('res.data:', response )
//   })
// }

// export const login = async (users_email:string, users_password:string) => {
//   const response = await fetch(Routes.api.firebase.login,{
//     // @ts-ignore
//     users_email,
//     users_password,
//   })
// }

// @ts-ignore
export const login = async (users_email:string, users_password:string) => {
  try{
    const response = await axios.post(Routes.api.firebase.login,{
      users_email,
      users_password,
    },getHeader())
    if(response?.status === 201 ){
      if(response?.data.message === "auth/too-many-requests"){}
      if(response?.data.message === "auth/user-not-found"){}
      if(response?.data.message === "auth/wrong-password"){}
    }
    if(response?.status === 200) {
      const { accessToken } = response?.data.data.stsTokenManager;
      set('accessToken', accessToken);
    }
    return response;
  } catch(error) {
    console.log('error login: ', error);
  }
};

export const validateUserFirebase = async () => {
  try{
    const response = await axios.post(Routes.api.firebase.validateUser,{},getHeader())
    const user = response?.data;
    // console.log('user save in sesionStorage: ', user);
    set('user', user);
    set('idusers', user.idusers);
    set('idroles', user.idroles);
    set('idsedes', user.idsedes);
    set('fullName', `${user.users_name} ${user.users_lastname}`)
    return response;
  } catch(error) {

  }
};

export const changePassword = async (users_email: string) => {
  try{
    const response = await axios.post(Routes.api.firebase.changePassword,{
      users_email,
    },getHeader())
    console.log('response: ', response);
    return response;
  } catch(error) {}
};
