import axios from "axios";
import Routes from "./allRoutes";
import {
  getHeader,
  getHeaderMultipart,
} from "../components/tools/SesionSettings";

export const uploadfile = async (file_pdf: any, idFiles: any) => {
  console.log("file_pdf: ", file_pdf, idFiles);
  try {
    const response = await axios.post(
      `${Routes.api.Pdf.uploadfile}/${idFiles}`,
      {
        pdf_file: file_pdf,
      },
      getHeaderMultipart()
    );
    console.log("response uploadfile: ", response);
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

export const getFile = async () => {
  try {
    const response = await axios.post(Routes.api.Pdf.getFile, {}, getHeader());
    console.log(response);
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
