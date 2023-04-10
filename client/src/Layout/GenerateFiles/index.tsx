import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import "./provider.css";
import { SelectChangeEvent } from "@mui/material/Select";
import InputSelect from "../../components/common/InputSelect";
import Upload from "../../components/common/Upload";
import Button from "../../components/common/Button";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import {
  optionAccountType,
  optionCediType,
} from "../../components/tools/OptionsValuesSelects";
import InputSelectRedirectTo from "../../components/common/InputSelectRedirectTo";
import UploadFileModal from "../../components/common/ModalUploadFile";

import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import AttachEmailRoundedIcon from "@mui/icons-material/AttachEmailRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Modal, TextField } from "@mui/material";

import "animate.css";
import { getCedis } from "../../services/Cedis.routes";
import { getUsers } from "../../services/Users.routes";
import { getSettled } from "../../services/generateSettled.service";
import { uploadfile } from "../../services/Pdf.routes";
import { getFiles, addFile } from "../../services/Files.routes";

import { formattedAmount } from "../../Utilities/formatted.utility";
import { createFilePath } from "../../services/FilesPath.routes";
import ModalSuccess from "../../components/common/ModalSuccess";
import { AllCedis, CedisIdName } from "../../interfaces/Cedis";
import InputSelectCedi from "../../components/common/InputSelectCedi";
import { GeneralValuesContext } from "../../Context/GeneralValuesContext";
import { roles } from "../../components/tools/SesionSettings";
import { get } from "../../components/tools/SesionSettings";
import SearchUser from "../../components/common/SearchUser";
import { AllUsers } from "./../../interfaces/User";
import InputSelectOnlyValue from "../../components/common/InputSelectOnlyValue";
// import PDF from "./components/PDF";
import { PDFViewer } from "@react-pdf/renderer";
import { width } from "@mui/system";
// import { savePDF, printPDF } from "./components/PDF/print";
import { ChildModalPdf } from "../../components/common/ModalUploadFile";

function GenerateFiles() {
  // ------------------------------VARIABLES------------------------------//
  // temporal para revisar respuesta
  const [result, setResult] = useState([""]); // respuesta envio formulario datos
  const [statusFileResponse, setStatusFileResponse] = useState(false);
  // valores actualizables con DB
  const [allUsers, setAllUsers] = useState([""]); // recibi todos los usuarios de DB
  const [allCedis, setAllCedis] = useState<any[]>([""]);
  const [optionsCedisIdName, setOptionsCedisIdName] = useState<CedisIdName[]>(
    []
  ); // recibe nombre y id de todas las cedis
  // const [optionsCedisId, setOptionsCedisId]     = useState<number[]>([])   //solo id de sede seleccionada
  // const [optionsCedisName, setOptionsCedisName] = useState<string[]>([]);

  const [optionsProviders, setOptionsProviders] = useState(["", ""]); // filtro de  allUsers los proveedores
  const [optionsRedirectTo, setOptionsRedirectTo] = useState([""]); // filtro allUsers con opciones redirectTo
  const [allFiles, setAllFiles] = useState([""]); //

  // validar condicionales para renderizar
  const [documentType, setDocumentType] = useState(""); // tipos documentos lo recibe de un type creado
  const [isSettled, setIsSettled] = useState(false); // es true cuando el numero de radicado llega de la DB
  const [invoiceType, setInvoiceType] = useState("Administrativo"); // define las opciondes de a quien va dirigido
  const [accountType, setAccountType] = useState(""); // con esto se hace un filtro para los tipos de usuario
  const [statusResponse, setStatusResponse] = useState(false); // status 200 para mostrar modal
  const [modalSuccess, setModalSuccess] = useState(false); // status 200 filePath para mostrar hijo modal

  // valores formulario 1 Get radicado
  const [cedi, setCedi] = useState(""); // con cedi se anexa al numero de radicado
  const [cediType, setCediType] = useState(""); //define si son cedis propias o nacionales

  // valores que envio al formulario 2
  const [idUser, setIdUser] = useState<number | undefined>(); //id extraido del objeto objectUser usuario tipo proveedor
  const [settledNumber, setSettledNumber] = useState(""); // numero de radicado generado por DB
  const [price, setPrice] = useState(""); // numero escrito en el input
  const [redirectTo, setRedirectTo] = useState<number>(); // selecionado de usuarios rol !== provider && radication
  const [accountNumber, setAccountNumber] = useState(""); // numero de cuenta relacionado a tipo de cuenta;

  // valores formulario file
  const [filePDFGoogle, setFilePDFGoogle] = useState("");
  // relacionamiento radicado y archivo
  const [comments, setComments] = useState("");

  // captura de valores de formulario que no son necesariamente para el form
  const [objectUser, setObjectUser] = useState<any>([]); // contiene un objeto con toda la info del usuario "proveedor"
  const [docIdentity, setDocIdentity] = useState(""); //
  const [address, setAddress] = useState(""); // su valor es extraido del objectUser
  const [email, setEmail] = useState(""); // su valor es extraido del objectUser
  const [companyName, setCompanyName] = useState(""); // su valor es extraido del objectUser
  const [lastname, setLastname] = useState(""); // su valor es extraido del objectUser
  const [telephone, setTelephone] = useState(""); // su valor es extraido del objectUser

  // sin identificar uso
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [role, setRole] = useState("radicacion");

  const { preLoad, setPreLoad } = useContext(GeneralValuesContext);

  // -----------------------METHODS INPUTS--------------------------------//

  /**
   * Funcion que se ejecuta al renderizar el componente, trae las cedis - users -
   * convierte el valor a ciudades y actualiza el estado
   * filtro de usuarios que solo tengan rol de proveedores y actualiza el estado
   * envio cedi para generar radicado
   */
  const handleGetUsersCedis = async () => {
    // cedis
    const allCedis: AllCedis[] = await getCedis();
    setAllCedis(allCedis);

    // users
    const getAllUsers = await getUsers();
    setAllUsers(getAllUsers);

    // options redirectTo Administration
    const filterAuditors = getAllUsers?.filter(
      (user: { idroles: number }) =>
        user.idroles == roles.AuditorGH ||
        user.idroles == roles.AuditorCRTL ||
        user.idroles == roles.AuditorRG ||
        user.idroles == roles.Gerencia ||
        user.idroles == roles.Contaduria ||
        user.idroles == roles.Tesoreria
    );
    setOptionsRedirectTo(filterAuditors);

    const getAllFiles = await getFiles();
    setAllFiles(getAllFiles?.data);

    setObjectUser([]);
  };

  /**
   * @param e captura valor tipo de cedi - traemos todas las cedis
   * filtramos cedi segun tipo
   * seteamos las opciones de cedis segun el filtro
   */
  const handleCediType = (e: SelectChangeEvent) => {
    const selectCediType = e.target.value;
    setCediType(selectCediType);

    const allCedisToFilter = allCedis;

    const filterCediType = allCedisToFilter.filter(
      (cedi: any, index) => cedi.sedes_type.toUpperCase() == selectCediType
    );

    setOptionsCedisIdName(filterCediType);
  };

  /**
   * @param e captura valor
   */
  const handleCedi = (e: SelectChangeEvent) => setCedi(e.target.value);
  const handleAccountType = (e: SelectChangeEvent) =>
    setAccountType(e.target.value);
  const handleRedirectTo = (e: SelectChangeEvent) =>
    setRedirectTo(Number(e.target.value));
  const handleComments = (e: any) => setComments(e.target.value);
  //ChangeEventHandler<HTMLTextAreaElement>

  /**
   * se ejecuta cuando el auto complete se actualiza
   * 1- tomo el valor seleccionado y capturo solo el numero identificacion
   * 2- filtro con tipo y numero de documento
   * 3- si el valor no es null entonces seteo valores
   * @param props
   */
  const handleValuesUser = (props: any) => {
    const documentNumberSelected = props.split("-")[0];

    const ProviderSelected = allUsers.find(
      (provider) =>
        // @ts-ignore
        provider.users_identification === documentNumberSelected &&
        // @ts-ignore
        provider.users_identification_type === documentType
    );
    if (![undefined, false, null, ""].includes(props)) {
      setObjectUser(props);
      // @ts-ignore
      setDocIdentity(ProviderSelected?.users_identification);
      // @ts-ignore
      setIdUser(ProviderSelected?.idusers);
      // @ts-ignore
      setAddress(ProviderSelected?.users_address);
      // @ts-ignore
      setEmail(ProviderSelected?.users_email);
      // @ts-ignore
      setCompanyName(ProviderSelected?.users_name);
      // @ts-ignore
      setLastname(ProviderSelected?.users_lastname);
      // @ts-ignore
      setTelephone(ProviderSelected?.users_phone);
    } else {
      setObjectUser([]);
    }
  };

  /**
   * metodo para mostrar a la vista el nombre del archivo seleccionado
   * @param e
   */
  const handleChangeFile = (e: SelectChangeEvent) => {
    // @ts-ignore
    setFilePDFGoogle(e.target.files[0]);
    const fileNameEvent = e.target.value.replace(/^.*\\/, ""); // renombrar archivo
    setFileName(fileNameEvent);
  };

  // ----------------------METHODS FORMS SUBMIT----------------------------//
  /**
   * ?FORMULARIO
   * toma la ciudad que se tenga en estado y hace get para generar radicado
   * @setSettledNumber : actualiza el estado de numero de radicado con la respuesta de la api
   * @param e evento
   */
  const handleSettledSubmit = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      // @ts-ignore
      const newSettled = await getSettled();

      setSettledNumber(newSettled);
      newSettled ? setIsSettled(true) : setIsSettled(false);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  /**
   * ?Formulario parte 2
   * formulario data set DB
   * 1- se envia los datos del radicado
   * 2- abro modal si es status 200 convirtiendo true variable statusFileResponse
   * 3- guardo respuesta en variable result
   * @param e
   */
  const handleFormSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setPreLoad(true);
      const addFileResponse = await addFile(
        // @ts-ignore
        idUser,
        settledNumber,
        price,
        redirectTo,
        // @ts-ignore
        cedi.idsedes,
        accountType,
        accountNumber,
        get("idusers")
      );
      // console.log("addFileResponse: ", addFileResponse);

      //muestro input file y textarea
      if (addFileResponse?.status == 200) {
        // savePDF(cediType, settledNumber, accountType);
        setStatusFileResponse(true);
      }

      // guardo respuesta completa en variable result
      // @ts-ignore
      setResult(addFileResponse);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  /**
   * @param e detiene el reset del la pantalla
   * almaceno en variable el id de la respuesta de la peticion anterior
   * por parametros envio archivo y variable anterior y en respuesta almaceno path(pathfileupload)
   *
   * nueva peticion http relaciono iddatos, rutaArchivoCargado, Comentarios
   * relaciono path de pdf y el file correspondiente
   */
  const handleFileSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setPreLoad(true);
      // @ts-ignore
      const idFiles = result?.data.file[0].idfiles;

      const responseUploadFile = await uploadfile(filePDFGoogle, idFiles); // guarda pdf
      // console.log("responseUploadFile: ", responseUploadFile);
      const pathFileUpload = await responseUploadFile?.data.pathFile; // almacena ruta asignada en variable

      // relaciona el idfiles con la ruta asignada es decir pathFileUpload
      const responseConcatFilePath = await createFilePath(
        idFiles,
        pathFileUpload,
        comments,
        get("idusers")
      ); // relaciona pdf y file

      // @ts-ignore
      if (responseConcatFilePath?.status === 200) {
        setModalSuccess(true);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  // ----------------------METHODS GENERALS--------------------------------//
  /**
   * reinicia todos los valores a '';
   */
  const handleReset = () => {
    setIsSettled(false);
    //@ts-ignore
    setIdUser("");
    setSettledNumber("");
    setDocumentType("");
    setCedi("");
    setAccountType("");
    setCompanyName("");
    setAddress("");
    setTelephone("");
    setEmail("");
    setPrice("");
    setInvoiceType("");
    setRedirectTo(undefined);
    setCediType("");
    setOptionsProviders(["", ""]);
  };
  const handleCloseModal = () => setStatusResponse(false);
  const handleCloseModalChild = () => setModalSuccess(false);

  /**
   * genero el nuevo numero de radicado
   * seteo los valores para esconder modales y limpiar las partes del formulario que son necesarias volver a llenar.
   */
  const newSettledSameUser = async () => {
    const newSettled = await getSettled();
    setSettledNumber(newSettled);
    // setAccountType('');
    setPrice("");
    setStatusFileResponse(false);
    setFilePDFGoogle("");
    setComments("");
    setModalSuccess(false);
    setStatusResponse(false);
  };

  /**
   * reseteo formulario por completo
   */
  const resetFullForm = () => {
    handleReset();
    setObjectUser([]);
    setStatusFileResponse(false);
    setFilePDFGoogle("");
    setComments("");
    setModalSuccess(false);
    setStatusResponse(false);
  };

  useEffect(() => {
    handleGetUsersCedis();
  }, []);

  return (
    <div className="layout">
      <div>
        <section className="layout-section">
          <div className="layout-left">
            <div className="container__createFiling">
              <h3 className="createFiling">Crear Nuevo Radicado</h3>
              {isSettled && (
                <button
                  className="button button--flex mt-6 buttonHover"
                  onClick={handleReset}
                >
                  <ArrowBackRoundedIcon className="arrow" /> Reiniciar{" "}
                </button>
              )}
              <ChildModalPdf
                cediType={cediType}
                settledNumber={settledNumber}
                accountType={accountType}
              />
            </div>
            {!isSettled ? (
              <article className="filing">
                <form onSubmit={handleSettledSubmit}>
                  <SearchUser
                    department={documentType}
                    setDepartment={setDocumentType}
                    city={objectUser}
                    setCity={handleValuesUser}
                    required
                  />
                  <div className="md:flex md:flex-wrap">
                    <article className="md:w-1/2">
                      <InputSelectOnlyValue
                        type={"text"}
                        name="cediType"
                        title="Tipo de Cedi"
                        placeholder="Tipo de Cedi"
                        required
                        value={cediType}
                        onChange={handleCediType}
                        itemDefault="selecciona el tipo de documento"
                        items={optionCediType}
                      />
                    </article>
                    <article className="md:w-1/2">
                      <InputSelectCedi
                        type={"text"}
                        title="Ciudad a Radicar"
                        placeholder="Ciudad a radicar"
                        name="cedi"
                        required
                        disabled={!cediType}
                        value={cedi}
                        onChange={handleCedi}
                        itemDefault="selecciona una opcion"
                        items={optionsCedisIdName}
                      />
                    </article>
                  </div>
                  <Button name="Generar numero Radicado"></Button>
                </form>
              </article>
            ) : (
              <article className="filing">
                <section>
                  <SearchUser
                    department={documentType}
                    setDepartment={setDocumentType}
                    city={objectUser}
                    setCity={handleValuesUser}
                    required
                  />
                  <div className="md:flex md:flex-wrap">
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Razon social
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"Razon Social"}
                        value={companyName}
                        setValue={setCompanyName}
                        required
                        disabled
                        iconEnd={<PermIdentityRoundedIcon />}
                      />
                    </article>
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Direccion
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"Direccion"}
                        value={address}
                        setValue={setAddress}
                        required
                        disabled
                        iconEnd={<LocationOnRoundedIcon />}
                      />
                    </article>
                  </div>

                  <div className="md:flex md:flex-wrap">
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Telefono
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"Telefono"}
                        value={telephone}
                        setValue={setTelephone}
                        required
                        disabled
                        iconEnd={<PhoneAndroidRoundedIcon />}
                      />
                    </article>
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Correo
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"Email"}
                        value={email}
                        setValue={setEmail}
                        required
                        disabled
                        iconEnd={<AttachEmailRoundedIcon />}
                      />
                    </article>
                  </div>

                  <div className="md:flex md:flex-wrap">
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Numero de Radicado
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"radicado"}
                        value={settledNumber}
                        setValue={setSettledNumber}
                        required
                        disabled
                        iconEnd={<NumbersRoundedIcon />}
                      />
                    </article>
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Valor
                        <b className="mx-12">
                          {" "}
                          {price !== "" && formattedAmount(price)}{" "}
                        </b>
                      </label>
                      <TextFieldOutlined
                        type={"number"}
                        label={"valor"}
                        value={price}
                        setValue={setPrice}
                        required
                        iconEnd={<AttachMoneyRoundedIcon />}
                      />
                    </article>
                  </div>

                  <div className="md:flex md:flex-wrap">
                    <article className="md:w-1/2">
                      <InputSelectOnlyValue
                        type={"text"}
                        title="Tipo de cuenta"
                        placeholder="cuenta de"
                        required
                        value={accountType}
                        onChange={handleAccountType}
                        itemDefault="selecciona el tipo de cuenta"
                        items={optionAccountType}
                      />
                    </article>
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        numero de cuenta
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"numero"}
                        value={accountNumber}
                        setValue={setAccountNumber}
                        required
                        iconEnd={<PostAddIcon />}
                      />
                    </article>
                  </div>

                  <div className="md:flex md:flex-wrap">
                    <article className="md:w-1/2">
                      <InputSelectRedirectTo
                        type={"number"}
                        title="Dirigido "
                        placeholder="Para"
                        required
                        value={redirectTo}
                        onChange={handleRedirectTo}
                        itemDefault="selecciona el Auditor"
                        items={optionsRedirectTo}
                      />
                    </article>
                  </div>
                  <button
                    className="button button--flex mt-6"
                    onClick={() => setStatusResponse(true)}
                  >
                    Validar Informacion
                  </button>
                </section>

                <UploadFileModal
                  open={statusResponse}
                  close={handleCloseModal}
                  companyName={companyName}
                  lastname={lastname}
                  docIdentity={docIdentity}
                  price={price}
                  accountType={accountType}
                  accountNumber={accountNumber}
                  invoiceType={invoiceType}
                  redirectTo={redirectTo}
                  optionsRedirectTo={optionsRedirectTo}
                  // @ts-ignore
                  cedi={cedi.sedes_city}
                  settledNumber={settledNumber}
                  email={email}
                  cediType={cediType}
                >
                  <form onSubmit={handleFormSubmit}>
                    <Button name="Crear requerimientos"></Button>
                  </form>
                  {/* aqui el intento de pdf */}
                  {/* <ChildModalPdf
                    cediType={cediType}
                    settledNumber={settledNumber}
                    accountType={accountType}
                  /> */}
                  {/* <PDF
                      cediType={cediType}
                      settledNumber={settledNumber}
                      accountType={accountType}
                    /> */}
                  {/* hola mundo */}
                  {/* </ChildModalPdf> */}

                  {statusFileResponse && (
                    <div className="flex rounded justify-between">
                      <form
                        onSubmit={handleFileSubmit}
                        className="border-neutral-300 border-2 division--containers"
                      >
                        <Upload
                          file={filePDFGoogle}
                          fileName={fileName}
                          handleChangeFile={handleChangeFile}
                        />
                        <button
                          className="button button--flex mt-4 relative top-4"
                          // type='submit'
                        >
                          Adjuntar Archivos
                        </button>
                      </form>
                      <textarea
                        name="Comentario"
                        id="comentary"
                        placeholder="Es necesario dejar alguna observacion"
                        className="border-neutral-300 border-2 resize-none division--containers"
                        required
                        value={comments}
                        onChange={handleComments}
                      ></textarea>
                    </div>
                  )}
                  <ModalSuccess
                    open={modalSuccess}
                    close={handleCloseModalChild}
                    setModalSuccess={setModalSuccess}
                    type={"Radicado"}
                    identification={settledNumber}
                    newSettledSameUser={newSettledSameUser}
                    resetFullForm={resetFullForm}
                  />
                </UploadFileModal>
              </article>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default GenerateFiles;
