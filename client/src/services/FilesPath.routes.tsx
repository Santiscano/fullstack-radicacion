import axios from "axios";
import Routes from "./Routes";
import { getHeader, set } from "../components/tools/SesionSettings";

export const getFilesPath = async () => {
  try {
    const response = await axios.post(
      Routes.api.filesPath.getFilesPath,
      {
        api_key: import.meta.env.VITE_API_KEY,
      },
      getHeader()
    );
    console.log("response: ", response);
  } catch (error) {
    console.log("error: ", error);
  }
};
export const createFilePath = async (
  idFiles: number,
  pathFileUpload: string,
  comments: string,
  IdUserSession: any
) => {
  try {
    console.log(
      "envio lo siguiente: ",
      idFiles,
      pathFileUpload,
      comments,
      IdUserSession
    );
    const response = await axios.post(
      Routes.api.filesPath.createFilePath,
      {
        idfiles: idFiles,
        files_path: pathFileUpload,
        files_path_observation: comments,
        userSession: IdUserSession,
      },
      getHeader()
    );
    console.log("response createFilepath: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const deleteFilePath = async () => {
  try {
    const response = await axios.delete(
      Routes.api.filesPath.deleteFilePath,
      getHeader()
    );
    console.log("response: ", response);
  } catch (error) {
    console.log("error: ", error);
  }
};
