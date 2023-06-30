import { Box, Divider, Modal, Tooltip } from '@mui/material'
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import useContextProvider from '../../../Context/GeneralValuesContext';
import { capitalizeFirstLatterUppercase, formattedAmount } from '../../../Utilities/formatted.utility';
import { useAppSelector } from '../../../redux/hooks/useStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import allRoutes from '../../../services/allRoutes';
import { getHeader, remove } from '../../../components/tools/SesionSettings';
import { useNavigate } from 'react-router-dom';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  height: "99vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 2,
};

const ModalInfo = () => {
  const [viewPDF, setViewPDF] = useState(false);
  const [listRoutesPDF, setListRoutesPDF] = useState<any>("");

  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const navigate = useNavigate();

  // consulta para pdf segun usuario
  const handleListFilesPDF = async () => {
    axios
      .post(
        allRoutes.api.searchingFile.withSettled,
        { files_registered: user.files_registered },
        getHeader()
      )
      .then((res) => {
        console.log("getFilesFromSettled: ", res);
        setListRoutesPDF(res?.data.path);
        res?.status == 200 && setViewPDF(true);
      })
      .catch ((err) => {
        // @ts-ignore
        console.log("error ejecutado",err.response.data.message);
        // @ts-ignore
        const message = err.response.data.message;
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
    })
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
          <h3 className="createFiling mb-1">Historial de mis archivos</h3>
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
              {user.users_name && (
                <div className="text-2xl font-bold mr-8">
                  {capitalizeFirstLatterUppercase(user.users_name)}{" "}
                  {capitalizeFirstLatterUppercase(user.users_lastname)}
                </div>
              )}
            </div>

            <div className="flex mt-3 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo De Documento:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase( user.users_identification_type )}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Numero De Documento:
                <span className="text-slate-600 font-normal">
                  {` ${user.users_identification}-${user.users_identification_digital_check}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Estado Usuario:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.users_status)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-3 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Email:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.users_email)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Teléfono:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.users_phone)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Direccion:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.users_address)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-3 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Radicado:{" "}
                <span className="text-slate-600 font-normal">
                  {user.files_registered}
                </span>
              </p>
              <p className="font-bold text-lg inline-block mr-4 w-1/3">
                Precio: {formattedAmount(user.files_price)}
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo De Archivo:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.files_type)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-3 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo De Cuenta:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase( user.files_account_type )}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Numero de Cuenta:
                <span className="text-slate-600 font-normal">
                  {` ${user.files_account_type_number}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Estado Archivo:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.files_states)}`}
                </span>
              </p>
            </div>

            <div className="flex mt-3 w-full">
              <p className="font-bold inline-block mr-4 w-1/3">
                Tipo de Cedi:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.sedes_type)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Nombre Cedi:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase(user.sedes_name)}`}
                </span>
              </p>
              <p className="font-bold inline-block mr-4 w-1/3">
                Asignacion Actual:
                <span className="text-slate-600 font-normal">
                  {` ${capitalizeFirstLatterUppercase( user.UserAssignedName )} ${capitalizeFirstLatterUppercase( user.UserAssignedLastname )} / ${capitalizeFirstLatterUppercase( user.UserAssignedRoles )}`}
                </span>
              </p>
            </div>

            <div className="flex mt-3 w-full">
              {(user.files_code_accounting || user.files_code_treasury) && (
                <p className="font-bold inline-block mr-4 w-1/3">
                  Numero de Causacion:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase( user.files_code_accounting! )}`}
                  </span>
                </p>
              )}
              {user.files_code_treasury && (
                <p className="font-bold inline-block mr-4 w-1/3">
                  Numero de Tesoreria:
                  <span className="text-slate-600 font-normal">
                    {` ${capitalizeFirstLatterUppercase( user.files_code_treasury )}`}
                  </span>
                </p>
              )}
            </div>

            {viewPDF && (
              <div className="flex w-fu">
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
        </div>
      </Box>
    </Modal>
  )
}

export default ModalInfo
