import axios from "axios";
import Routes from './allRoutes'
import { getHeader } from '../components/tools/SesionSettings';

export const getPdfSettled = async (settledNumber:number) => {
  try{
    const response = await axios.post(Routes.api.pdfSettledNumber, settledNumber, getHeader() )
    // console.log(response)
    return response;
  } catch(err) {
    // console.log(err)
  }
}
