import { useState } from "react";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { SearchWithDocument, SearchWithSettled } from "../../../services/SearchFile.routes";
import { SelectChangeEvent } from "@mui/material";
import { uploadfile } from "../../../services/Pdf.routes";
import { createFilePath } from "../../../services/FilesPath.routes";
import { get } from "../../../components/tools/SesionSettings";

export const useAttachFile = () => {
  // ------------ STATES ---------------//
  const [showValue, setShowValue] = useState(0);
  const [settled, setSettled] = useState("");
  const [document, setDocument] = useState({
    type: "",
    number: "",
  });
  const [success, setSuccess] = useState(false);
  const [notFile, setNotFile] = useState(false);
  const [file, setFile] = useState({
    idfiles: "",
    accountType: "",
    accountNumber: "",
    settled: "",
    fileType: "",
    email: "",
    phone: "",
    address: "",
    cediName: "",
    identificationType: "",
    identificationNumber: "",
  });
  const [filePDF, setFilePDF] = useState("");
  const [fileName, setFileName] = useState("");
  const [comments, setComments] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false); // status 200 filePath para mostrar hijo modal
  const [listRoutesPDF, setListRoutesPDF] = useState<any>("");

  const { setPreLoad, handleMessageSnackbar } = useContextProvider();

  // --------------SETSTATES ---------------//
  const onType = (newValue: any) => {
    setDocument({
      ...document,
      type: newValue,
    });
  };
  const onNumber = (newValue: any) => {
    setDocument({
      ...document,
      number: newValue,
    });
  };
  const onClean = () => {
    setDocument({
      ...document,
      type: "",
      number: "",
    });
  };
  const onFile = (newValue: any) => {
    // console.log("newValue: ", newValue);
    setFile({
      idfiles: newValue.idfiles,
      accountType: newValue.files_account_type,
      accountNumber: newValue.files_account_type_number,
      settled: newValue.files_registered,
      fileType: newValue.files_type,
      email: newValue.users_email,
      phone: newValue.users_phone,
      address: newValue.users_address,
      cediName: newValue.sedes_name,
      identificationType: newValue.users_identification_type,
      identificationNumber: newValue.users_identification,
    });
  };

  // ------------- HANDLES --------------//
  /**
   * metodo para pasar entre filtrar por radicado o tipo y numero de documento
   * @param e
   * @param newValue
   */
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setShowValue(newValue);
  };

  /**
   * consulta por radicado para traer info y almacena info
   * @param e
   */
  const handleSubmitSettled = async (e: any) => {
    try {
      // console.log("se activo handleSubmitSettled");
      setPreLoad(true);
      e.preventDefault();
      const searchFile = await SearchWithSettled(settled);
      setListRoutesPDF(searchFile?.data.rutas);
      // console.log("list pdf:", searchFile?.data);
      if (searchFile?.status == 200) {
        setSuccess(true);
        setNotFile(false);
        onFile(searchFile?.data.radicado[0]);
        onClean();
      } else {
        setSuccess(false);
        setNotFile(true);
        onFile({});
      }
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  /**
   * consulta por tipo y numero documento y trae info
   * @param e
   */
  const handleSubmitDocumentType = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const searchFile = await SearchWithDocument(
        document.type,
        document.number
      );
      if (searchFile?.status == 200) {
        setSuccess(true);
        setNotFile(false);
        onFile(searchFile?.data.response[0]);
        onClean();
      } else {
        setSuccess(false);
        setNotFile(true);
        onFile({});
      }
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  /**
   * consulta el tracking segun el numero de radicado
   * @param e
   */
  const handleTrackingBySettled = async (e: any) => {
    try{
      e.preventDefault();
      setSuccess(true);
    } catch(err){
      console.log('err: ', err);
    }
  };
  /**
   * constulta el tracking segun el tipo y numero de documento
   * @param e
   */
  const handleTrackingByDocument = async (e: any) => {
    try{
      e.preventDefault();
      setSuccess(true);
    } catch(err){
      console.log('err: ', err);
    }
  };

  /**
   * metodo para mostrar a la vista el nombre del archivo seleccionado
   * @param e
   */
  const handleChangeFile = (e: SelectChangeEvent) => {
    // @ts-ignore
    // console.log("archivo capturado", e.target.files[0]);
    // @ts-ignore
    setFilePDF(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setFileName(fileNameEvent);
  };

  /**
   * @param e toma el valor nuevo en onchange
   */
  const handleComments = (e: SelectChangeEvent) => {
    setComments(e.target.value);
  };

  /**
   * envia nuevo pdf y lo relaciona con radicado consultado
   * @param e detiene el reset del la pantalla
   * por parametros envio archivo y variable anterior y en respuesta almaceno path(pathfileupload)
   *
   * nueva peticion http relaciono iddatos, rutaArchivoCargado, Comentarios
   * relaciono path de pdf y el file correspondiente
   */
  const handleFileSubmitAddPDF = async (e: any) => {
    try {
      e.preventDefault();
      setPreLoad(true);
      const responseUploadFile = await uploadfile(filePDF, file.idfiles);
      // console.log("responseUploadFile: ", responseUploadFile);
      const pathFileUpload = await responseUploadFile?.data.pathFile;

      const responseConcatFilePath = await createFilePath(
        parseInt(file.idfiles),
        pathFileUpload,
        comments,
        get("idusers")
      ); // relaciona pdf y file

      if (responseConcatFilePath?.status == 200) {
        handleMessageSnackbar("success", "PDF Cargado Con Exito");
        setPreLoad(false);
      }
    } catch (error) {
    } finally {
      setPreLoad(false);
      setComments("");
      setFileName("");
    }
  };

  //cerrar modal success
  const handleCloseModalChild = () => setModalSuccess(false);

  return {
    showValue,
    handleChange,
    handleSubmitSettled,
    settled,
    setSettled,
    notFile,
    handleSubmitDocumentType,
    document,
    onType,
    onNumber,
    success,
    file,
    listRoutesPDF,
    handleFileSubmitAddPDF,
    filePDF,
    fileName,
    handleChangeFile,
    comments,
    handleComments,
    modalSuccess,
    handleCloseModalChild,
    handleTrackingBySettled,
    handleTrackingByDocument,
  };
};
