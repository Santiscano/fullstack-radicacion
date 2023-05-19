import { useEffect, useState } from "react";
import { Box, Divider, Modal, SelectChangeEvent, Tooltip } from "@mui/material";
import axios from "axios";
// icons
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
// components
import useContextProvider from "../../../../../Context/GeneralValuesContext";
import { capitalizeFirstLatterUppercase, formattedAmount} from "../../../../../Utilities/formatted.utility";
import { useAppSelector } from "../../../../../redux/hooks/useStore";
import allRoutes from "../../../../../services/allRoutes";
import { get, getHeader, roles, stateFile } from "../../../../../components/tools/SesionSettings";
import InputSelectStateFile from "../InputSelectStateFile";
import InputSelectRedirectTo from "../../../../../components/common/InputSelectRedirectTo";
import { InputSelectReturnTo } from "../InputSelectReturnTo";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  height: "85vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const ModalAuth = () => {
  const [viewPDF, setViewPDF] = useState(false);
  const [listRoutesPDF, setListRoutesPDF] = useState<any>("");
  const [activitySelect, setActivitySelect] = useState<any>(); //valor opcion seleccionada de actividad a realizar
  const [redirectTo, setRedirectTo] = useState<number>();

  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const file = useAppSelector((state) => state.modalUserViewSlice);
  const changeStateFile = useAppSelector((state) => state.changeStateFileSlice)
  console.log('changeStateFile: ', changeStateFile);

  const handleListFilesPDF = async () => {
    axios
      .post(
        allRoutes.api.searchingFile.withSettled,
        { files_registered: file.files_registered },
        getHeader()
      )
      .then((res) => {
        console.log("getFilesFromSettled: ", res);
        setListRoutesPDF(res?.data.path);
        res?.status == 200 && setViewPDF(true);
      })
      .catch((err) => console.log(err));
  };

  const handleActivitySelect = (e: SelectChangeEvent) => setActivitySelect(e.target.value);
  const handleRedirectTo = (e: SelectChangeEvent) => setRedirectTo(Number(e.target.value));

  const handleOptionsRedirectTo = () => {
    if(Number(get("idroles")) == roles.AuditorCRTL || roles.AuditorGH || roles.AuditorRG ||  roles.AuditorTI)
  };

  useEffect(() => {
    handleListFilesPDF();
  }, [openModalAuth]);

  return (
    <Modal
      open={openModalAuth}
      onClose={handleOpenModalAuth}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between mx-2">
          <h3 className="createFiling mb-1">Autorizar Radicado</h3>
          <HighlightOffOutlinedIcon
            onClick={handleOpenModalAuth}
            style={{ fontSize: "35px", cursor: "pointer" }}
          />
        </div>
        <Divider />
        <div className="flex flex-col items-center w-auto mt-2">
          {/* data file */}
          <section className="flex flex-wrap w-full items-center justify-between ">
            <div className="flex justify-between flex-wrap">
              {file.users_name && (
                <div className="text-2xl font-bold mr-8">
                  {capitalizeFirstLatterUppercase(file.users_name)}{" "}
                  {capitalizeFirstLatterUppercase(file.users_lastname)}
                </div>
              )}
            </div>

            <div className="flex mt-4 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo De Documento:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase( file.users_identification_type )}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Numero De Documento:
                <span className="text-slate-600 font-normal">
                  {` ${file.users_identification}-${file.users_identification_digital_check}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Estado Usuario:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.users_status)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-4 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Email:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.users_email)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Teléfono:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.users_phone)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Direccion:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.users_address)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-4 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Radicado:{" "}
                <span className="text-slate-600 font-normal">
                  {file.files_registered}
                </span>
              </p>
              <p className="font-bold text-lg inline-block mr-4 w-1/3">
                Precio: {formattedAmount(file.files_price)}
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo De Archivo:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.files_type)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-4 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo De Cuenta:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase( file.files_account_type )}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Numero de Cuenta:
                <span className="text-slate-600 font-normal">
                  {` ${file.files_account_type_number}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Estado Archivo:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.files_states)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-4 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo de Cedi:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.sedes_type)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Nombre Cedi:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(file.sedes_name)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Asignacion Actual:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase( file.UserAssignedName )} ${capitalizeFirstLatterUppercase( file.UserAssignedLastname )} / ${capitalizeFirstLatterUppercase( file.UserAssignedRoles )}`}
                </span>
              </p>
            </div>

            <div className="flex mt-4 w-full">
              {(file.files_code_accounting || file.files_code_treasury) && (
                <p className="font-bold inline-block mr-4 w-1/3">
                  Numero de Causacion:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase( file.files_code_accounting! )}`}
                  </span>
                </p>
              )}
              {file.files_code_treasury && (
                <p className="font-bold inline-block mr-4 w-1/3">
                  Numero de Tesoreria:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase( file.files_code_treasury )}`}
                  </span>
                </p>
              )}
            </div>

            {viewPDF && (
              <div className="flex mt-4 w-fu">
                {listRoutesPDF &&
                  listRoutesPDF.map((pdf: any, index: any) => (
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
          </section>

          {/* input change state */}
          <section className="flex w-full mt-2">
            <article className="w-1/2">
              {changeStateFile && (
                <InputSelectStateFile
                  title="Estado a Generar"
                  placeholder="Seleccione una Actividad"
                  value={activitySelect}
                  onChange={handleActivitySelect}
                  required
                  name="accion"
                  itemDefault="Que Accion tomaras"
                  items={changeStateFile}
                />
              )}
            </article>
            {/* si es Aprobar mostrara */}
            {(activitySelect == stateFile.AprobadoAuditor ||
              activitySelect == stateFile.AprobadoGerente ||
              activitySelect == stateFile.AprobadoContabilidad) && (
              <article className="w-1/2">
                <InputSelectRedirectTo
                  title="Asignar A"
                  placeholder="Quien debe continuar?"
                  type={"number"}
                  required
                  value={redirectTo}
                  onChange={handleRedirectTo}
                  itemDefault="selecciona el Auditor"
                  items={optionsRedirectTo}
                />
              </article>
            )}
            {/* si es devuelto mostrara */}
            {activitySelect == stateFile.Devuelto && (
              <article className="w-1/2">
                {/* <InputSelectReturnTo
                  title="Devolver A"
                  placeholder="A Quien se asignara?"
                  type={"number"}
                  required
                  value={redirectTo}
                  onChange={handleRedirectTo}
                  itemDefault="selecciona el Auditor o Gerente"
                  items={optionsReturnTo}
                /> */}
              </article>
            )}
          </section>

        </div>
      </Box>
    </Modal>
  );
};

export default ModalAuth;
