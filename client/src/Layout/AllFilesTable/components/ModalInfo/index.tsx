import { useEffect, useState } from "react";
import { Divider, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import "animate.css";
import {
  capitalizeFirstLatterUppercase,
  formattedAmount,
} from "../../../../Utilities/formatted.utility";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import { SearchWithSettled } from "./../../../../services/SearchFile.routes";

export default function ModalInfoFile(props: any) {
  // ------------------------------VARIABLES------------------------------//
  const [listRoutesPDF, setListRoutesPDF] = useState<any>("");
  const [viewPDF, setViewPDF] = useState(false);
  const { openModalAuth, handleOpenModalAuth, dataUser, setDataUser } =
    useContextProvider();
  // console.log("datauser: ", dataUser);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
    overflow: "scroll",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const {
    users_name,
    users_lastname,
    users_identification_type,
    users_identification,
    users_identification_digital_check,
    users_email,
    users_phone,
    users_address,
    users_status,
    files_registered,
    files_price,
    files_account_type,
    files_account_type_number,
    files_code_accounting,
    files_code_treasury,
    files_type,
    files_states,
    sedes_type,
    sedes_name,
    idfiles_states,
    UserAssignedName,
    UserAssignedLastname,
    UserAssignedRoles,
  } = dataUser?.row;

  const handleListFilesPDF = async () => {
    const getFilesFromSettled = await SearchWithSettled(files_registered);
    console.log("getFilesFromSettled: ", getFilesFromSettled);
    setListRoutesPDF(getFilesFromSettled?.data.path);
    getFilesFromSettled?.status == 200 && setViewPDF(true);
    console.log("listroutesPDF", listRoutesPDF);
  };

  useEffect(() => {
    handleListFilesPDF();
  }, [openModalAuth]);

  return (
    <>
      <Modal
        open={openModalAuth}
        onClose={handleOpenModalAuth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeIn"
      >
        <Box sx={style}>
          <div className="flex justify-between mx-2">
            <h3 className="createFiling mb-1">Información Radicado</h3>
            <HighlightOffOutlinedIcon style={{fontSize: "35px", cursor: "pointer"}} onClick={handleOpenModalAuth}/>
          </div>
          <Divider />
          <div className="flex flex-col items-center w-auto mt-2">
            <section className="flex flex-wrap w-full items-center justify-between ">
              <div className="flex justify-between flex-wrap">
                {users_name && (
                  <div className="text-2xl font-bold mr-8">
                    {capitalizeFirstLatterUppercase(users_name)}{" "}
                    {capitalizeFirstLatterUppercase(users_lastname)}
                  </div>
                )}
              </div>

              <div className="flex mt-4 w-full">
                <p className="font-bold inline-block mr-4 w-1/3">
                  Tipo De Documento:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(
                      users_identification_type
                    )}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Numero De Documento:
                  <span className="text-slate-600 font-normal">
                    {` ${users_identification}-${users_identification_digital_check}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Estado Usuario:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(users_status)}`}
                  </span>
                </p>
              </div>

              <div className="flex mt-4 w-full">
                <p className="font-bold inline-block mr-4 w-1/3">
                  Email:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(users_email)}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Teléfono:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(users_phone)}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Direccion:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(users_address)}`}
                  </span>
                </p>
              </div>

              <div className="flex mt-4 w-full">
                <p className="font-bold inline-block mr-4 w-1/3">
                  Radicado:{" "}
                  <span className="text-slate-600 font-normal">
                    {files_registered}
                  </span>
                </p>
                <p className="font-bold text-lg inline-block mr-4 w-1/3">
                  Precio: {formattedAmount(files_price)}
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Tipo De Archivo:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(files_type)}`}
                  </span>
                </p>
              </div>

              <div className="flex mt-4 w-full">
                <p className="font-bold inline-block mr-4 w-1/3">
                  Tipo De Cuenta:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(files_account_type)}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Numero de Cuenta:
                  <span className="text-slate-600 font-normal">
                    {` ${files_account_type_number}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Estado Archivo:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(files_states)}`}
                  </span>
                </p>
              </div>

              <div className="flex mt-4 w-full">
                <p className="font-bold inline-block mr-4 w-1/3">
                  Tipo de Cedi:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(sedes_type)}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Nombre Cedi:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(sedes_name)}`}
                  </span>
                </p>
                <p className="font-bold inline-block mr-4 w-1/3">
                  Asignacion Actual:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase(
                      UserAssignedName
                    )} ${capitalizeFirstLatterUppercase(
                      UserAssignedLastname
                    )} / ${capitalizeFirstLatterUppercase(UserAssignedRoles)}`}
                  </span>
                </p>
              </div>

              <div className="flex mt-4 w-full">
                {(files_code_accounting || files_code_treasury)  && (
                  <p className="font-bold inline-block mr-4 w-1/3">
                    Numero de Causacion:
                    <span className="text-slate-600 font-normal">
                      {` ${capitalizeFirstLatterUppercase(
                        files_code_accounting
                      )}`}
                    </span>
                  </p>
                )}
                {files_code_treasury && (
                  <p className="font-bold inline-block mr-4 w-1/3">
                    Numero de Tesoreria:
                    <span className="text-slate-600 font-normal">
                      {` ${capitalizeFirstLatterUppercase(
                        files_code_treasury
                      )}`}
                    </span>
                  </p>
                )}
              </div>

              {viewPDF && (
                <div className="flex mt-4 w-fu">
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
            </section>
          </div>
        </Box>
      </Modal>
    </>
  );
}
