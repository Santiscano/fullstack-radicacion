import { SelectChangeEvent, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect } from "react";
import { capitalizeFirstLatterUppercase } from "../../Utilities/formatted.utility";
import Button from "../../components/common/Button";
import InputSelectOnlyValue from "../../components/common/InputSelectOnlyValue";
import LoadingMUI from "../../components/common/LoadingMUI";
import ModalSuccess from "../../components/common/ModalSuccess";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import Upload from "../../components/common/Upload";
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
import { optionAccountType } from "../../components/tools/OptionsValuesSelects";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal";
import "./AttachFile.css";
import SearchSettled from "./components/SearchSettled/index";
import { useAttachFile } from "./hooks/useAttachFile";


function AttachFile() {
  const {
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
  } = useAttachFile();
  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection("ADJUNTAR ARCHIVOS")
  },[])

  return (
    <div className="layout">
      <div>
        <LoadingMUI />
        <section className="layout-section">
          <div className="layout-left">
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
                    <Tab label="Filtrar por Tipo y Numero de Documento" {...a11yProps(1)}
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
            </article>
            {success && (
              <>
                <article className="filing-attachFile">
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Tipo De Cuenta:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.accountType)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Número de Cuenta:
                      <span className="text-slate-600 font-normal">
                        {` ${file.accountNumber}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Número Radicado:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.settled)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Tipo de Archivo:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.fileType)}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Email:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.email)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Teléfono:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.phone)}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Dirección:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.address)}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Nombre Cedi:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(file.cediName)}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p className="font-bold inline-block mr-4 w-1/2">
                      Tipo de Identificación:
                      <span className="text-slate-600 font-normal">
                        {` ${capitalizeFirstLatterUppercase(
                          file.identificationType
                        )}`}
                      </span>
                    </p>
                    <p className="font-bold inline-block mr-4">
                      Número de Identificación:
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
                  {listRoutesPDF && (
                    <div className="flex flex-wrap my-3">
                      {listRoutesPDF.map((pdf: any, index: any) => (
                        <a key={index} href={pdf.files_path} target="_blank">
                          <Tooltip
                            title={pdf.files_path_observation}
                            placement="top"
                          >
                            <button className="button">
                              abrir archivo {index + 1}
                            </button>
                          </Tooltip>
                        </a>
                      ))}
                    </div>
                  )}
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
