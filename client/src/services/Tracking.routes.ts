import axios from "axios";
import Routes from "./allRoutes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getAllTrackings = async () => {
  try{
    const tracking = await axios.get(Routes.api.tracking.getAllTrackings,getHeader())
    console.log('tracking: ', tracking);
    return tracking;
  }catch(error){
    console.log(error)
  }
};
export const getTrackingBySettled = async (files_registered:any) => {
  try{
    const tracking = await axios.post(Routes.api.tracking.getTrackingBySettled,{
      files_registered
    },getHeader())
    console.log('tracking: ', tracking);
    return tracking;
  }catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
export const getTrackingByAccountType = async (files_account_type:any, files_account_type_number:any) => {
  try{
    const tracking = await axios.post(Routes.api.tracking.getTrackingByDocument,{
      files_account_type,
      files_account_type_number
    },getHeader())
    console.log('tracking: ', tracking);
    return tracking;
  }catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
};
