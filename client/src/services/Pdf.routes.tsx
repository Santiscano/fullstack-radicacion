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
  } catch (error) {
    console.log(error);
  }
};

export const getFile = async () => {
  try {
    const response = await axios.post(Routes.api.Pdf.getFile, {}, getHeader());
    // console.log(response);
    return response;
  } catch (error) {
    // console.log(error);
  }
};
