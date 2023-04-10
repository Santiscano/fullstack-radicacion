import axios from "axios";
import Routes from "./Routes";
import {
  getHeader,
  getHeaderMultipart,
} from "../components/tools/SesionSettings";

export const uploadfile = async (file_pdf: any, idFiles: any) => {
  try {
    // const response = await axios.post(`${Routes.api.Pdf.uploadfile}/${idFiles}`, file, getHeader())
    const response = await axios.post(
      `${Routes.api.Pdf.uploadfile}/${idFiles}`,
      {
        pdf_file: file_pdf,
      },
      getHeaderMultipart()
    );
    console.log("response uploadfile: ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFile = async () => {
  try {
    const response = await axios.post(Routes.api.Pdf.getFile, {}, getHeader());
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
