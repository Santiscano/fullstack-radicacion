import Button from "../../components/common/Button";
import Upload from "../../components/common/Upload";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import { useContext, useEffect, useState } from "react";
import { GeneralValuesContext } from "./../../Context/GeneralValuesContext";
import {
  SearchWithDocument,
  SearchWithSettled,
  GetAllSettled,
} from "./../../services/SearchFile.routes";
import LoadingMUI from "../../components/common/LoadingMUI";
import InputSelect from "./../../components/common/InputSelect";
import { optionAccountType } from "../../components/tools/OptionsValuesSelects";
import { SelectChangeEvent } from "@mui/material/Select";
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
import "./AttachFile.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { capitalizeFirstLatterUppercase } from "../../Utilities/formatted.utility";
import { uploadfile } from "../../services/Pdf.routes";
import { createFilePath } from "../../services/FilesPath.routes";
import { get } from "../../components/tools/SesionSettings";
import ModalSuccess from "../../components/common/ModalSuccess";
import SearchSettled from "./../../components/common/SearchSettled/index";
import InputSelectOnlyValue from "../../components/common/InputSelectOnlyValue";
// const optionAccountType = ["CUENTA COBRO", "FACTURA PROVEEDOR"];

function AttachFile() {
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

  const { setPreLoad } = useContext(GeneralValuesContext);
  const listRoutesPDF = ["ruta1", "ruta2", "ruta3", "ruta4", "ruta5", "ruta6"];

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
    console.log("newValue: ", newValue);
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
  // const handleAccountType = (e: SelectChangeEvent) => {
  //   onType(e.target.value);
  // };

  // const getAllRegisteredFiles = async () => {
  //   try {
  //     const Settleds = await GetAllSettled();
  //     console.log("Settleds: ", Settleds?.data.data);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   } finally {
  //   }
  // };

  /**
   * consulta por radicado para traer info y almacena info
   * @param e
   */
  const handleSubmitSettled = async (e: any) => {
    try {
      console.log("se activo handleSubmitSettled");
      setPreLoad(true);
      e.preventDefault();
      const searchFile = await SearchWithSettled(settled);
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
      console.log("error: ", error);
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
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  /**
   * metodo para mostrar a la vista el nombre del archivo seleccionado
   * @param e
   */
  const handleChangeFile = (e: SelectChangeEvent) => {
    // @ts-ignore
    console.log("archivo capturado", e.target.files[0]);
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
      setPreLoad(true);
      e.preventDefault();
      const responseUploadFile = await uploadfile(filePDF, file.idfiles);
      console.log("responseUploadFile: ", responseUploadFile);
      const pathFileUpload = await responseUploadFile?.data.pathFile;

      const responseConcatFilePath = await createFilePath(
        parseInt(file.idfiles),
        pathFileUpload,
        comments,
        get("idusers")
      ); // relaciona pdf y file

      const status = responseConcatFilePath?.status;
      status === 200 && setModalSuccess(true);
    } catch (error) {
    } finally {
      setPreLoad(false);
      setComments("");
      setFileName("");
    }
  };

  //cerrar modal success
  const handleCloseModalChild = () => setModalSuccess(false);

  useEffect(() => {
    // getAllRegisteredFiles();
  }, []);

  return (
    <div className="layout">
      <div>
        <LoadingMUI />
        <section className="layout-section">
          <div className="layout-left">
            <div className="container__createFiling">
              <h3 className="createFiling">Buscar un Archivo</h3>
            </div>
            <article className="filing-attachFile">
              <Box sx={{ with: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={showValue}
                    onChange={handleChange}
                    aria-label="Area TI"
                    variant="scrollable"
                  >
                    <Tab label="Filtrar Por radicado" {...a11yProps(0)} />
                    <Tab
                      label="Filtrar por Tipo y Numero de Documento"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={showValue} index={0}>
                  <Box>
                    <form onSubmit={handleSubmitSettled}>
                      <div className="md:flex md:flex-wrap">
                        <article className="w-full">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            Numero de Radicado
                          </label>
                          <SearchSettled
                            label={"Radicado"}
                            value={settled}
                            setValue={setSettled}
                            selected={["FINALIZADO"]}
                            required
                          />

                          {/* <TextFieldOutlined
                            type={"text"}
                            label={"Radicado"}
                            value={settled}
                            setValue={setSettled}
                            required
                            // iconEnd={<PermIdentityRoundedIcon />}
                          /> */}
                        </article>
                      </div>
                      <Button name="Buscar Archivo" />
                      {notFile && (
                        <div className="text-red-600">
                          no hemos encontrado informacion
                        </div>
                      )}
                    </form>
                  </Box>
                </TabPanel>
                <TabPanel value={showValue} index={1}>
                  <Box>
                    <form onSubmit={handleSubmitDocumentType}>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <InputSelectOnlyValue
                            type={"text"}
                            title="Tipo de cuenta"
                            placeholder="cuenta de"
                            required
                            value={document.type}
                            // onChange={handleAccountType}
                            onChange={(e: SelectChangeEvent) =>
                              onType(e.target.value)
                            }
                            itemDefault="selecciona el tipo de cuenta"
                            items={optionAccountType}
                          />
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            Numero de Documento
                          </label>
                          <TextFieldOutlined
                            type={"text"}
                            label={"Numero"}
                            value={document.number}
                            setValue={onNumber}
                            required
                            // iconEnd={<PermIdentityRoundedIcon />}
                          />
                        </article>
                      </div>
                      <Button name="Buscar Archivo" />
                      {notFile && (
                        <div className="text-red-600">
                          no hemos encontrado informacion
                        </div>
                      )}
                    </form>
                  </Box>
                </TabPanel>
              </Box>
              {/* {!success && <div>hola</div>} */}
            </article>
            {success && (
              <>
                <article className="filing">
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Tipo De Cuenta:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.accountType)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Numero de Cuenta:
                      <span className="text-slate-600 font-normal">
                        {` ${file.accountNumber}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Numero Radicado
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.settled)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Tipo de Archivo
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.fileType)}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Email
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.email)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Telefono
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.phone)}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Direccion
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.address)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Nombre Cedi
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.cediName)}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Tipo de Identificacion
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(
                          file.identificationType
                        )}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Numero de Identificacion
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(
                          file.identificationNumber
                        )}`}
                      </span>
                    </p>
                  </div>
                </article>
                <article className="filing-attachFile">
                  <h2 className="font-bold text-2xl ml-3">Archivos Cargados</h2>
                  <div className="flex flex-wrap my-3">
                    {listRoutesPDF.map((pdf, index) => (
                      <a key={index} href={pdf} target="_blank">
                        <button className="button">
                          abrir archivo {index + 1}
                        </button>
                      </a>
                    ))}
                  </div>
                </article>
                <article className="filing-attachFile">
                  <form onSubmit={handleFileSubmitAddPDF}>
                    <Upload
                      file={filePDF}
                      fileName={fileName}
                      handleChangeFile={handleChangeFile}
                    />
                    <textarea
                      name="Comentarios"
                      id="comentary"
                      placeholder="si necesita comentarios ingreselos aquí"
                      className="border-neutral-300 border-2 w-full resize-none mt-6"
                      value={comments}
                      // @ts-ignore
                      onChange={handleComments}
                    ></textarea>
                    <Button name="adjuntar nuevo archivo" />
                  </form>
                </article>
                <ModalSuccess
                  open={modalSuccess}
                  close={handleCloseModalChild}
                  type="radicado"
                  identification={file.settled}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AttachFile;
