import axios from "axios";
import Routes from './allRoutes'
import { getHeader } from '../components/tools/SesionSettings';

export const getPdfSettled = async (settledNumber:number) => {
  try{
    // const response = await axios.post(Routes.api.pdfSettledNumber, settledNumber, getHeader() )
    // console.log(response)
    // return response;
  } catch (err) {
    // @ts-ignore
    console.log("error ejecutado",err.response.data.message);
    // @ts-ignore
    const message = err.response.data.message;
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
      return message
    }
  }
}
