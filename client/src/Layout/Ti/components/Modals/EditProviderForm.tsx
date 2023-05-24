import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Divider, Modal } from "@mui/material";
import "animate.css";
import { FC } from "react";
import Button from "../../../../components/common/Button";
import InputSelectCedi from "../../../../components/common/InputSelectCedi";
import InputSelectDocType from "../../../../components/common/InputSelectDocType";
import LoadingMUI from "../../../../components/common/LoadingMUI";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import useSubmit from "../../Hooks/useSubmit";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import InputEditCedi from "../common/InputEditCedi";
import { useModalUserView } from "../../../../redux/Redux-actions/useModalUserView";
import InputEditDocumentType from "../common/InputEditDocumentType";
import { formateData, formatearFecha } from "../../../../Utilities/formatted.utility";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const EditProviderForm: FC = () => {
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { handleSubmitUpdateProvider, handleSubmitInactiveProvider } = useSubmit();
  const { setUsersIdentification, setUsersName, setUsersAddress, setUsersPhone, setUsersEmail, setUsersLimitDayPayment, setUsersExpiration } = useModalUserView();

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
          <div className="flex justify-between items-center">
            <h3 className="p-2.5 text-3xl font-bold mb-3">Editar Proveedor</h3>
            <CloseOutlinedIcon
              onClick={handleOpenModalAuth}
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
          </div>
          <Divider />
          <form
            onSubmit={(event) =>
              handleSubmitUpdateProvider(event, handleOpenModalAuth)
            }
          >
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Asignar Rol
                </label>
                <TextFieldOutlined type={"text"} value={"PROVEEDOR"} disabled />
              </article>
              <article className="md:w-1/2">
                <InputEditCedi
                  type={"text"}
                  title="Asignar Cedi"
                  placeholder="Cedi"
                  name="cedi"
                  required
                  itemDefault="selecciona una opcion"
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <InputEditDocumentType
                  type={"text"}
                  title="Tipo de Documento"
                  placeholder="C.C, NIT..."
                  name="type"
                  itemDefault="selecciona un tipo"
                  disabled
                />
              </article>
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Numero de documento
                </label>
                <TextFieldOutlined
                  type={"number"}
                  label={"Numero"}
                  value={user.users_identification}
                  setValue={setUsersIdentification}
                  required
                  disabled
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Nombres
                </label>
                <TextFieldOutlined
                  type={"text"}
                  label={"Nombre"}
                  value={user.users_name}
                  setValue={setUsersName}
                  required
                />
              </article>
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Dirección
                </label>
                <TextFieldOutlined
                  type={"text"}
                  label={"Dirección Ubicacion"}
                  value={user.users_address}
                  setValue={setUsersAddress}
                  required
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Teléfono
                </label>
                <TextFieldOutlined
                  type={"number"}
                  label={"numero"}
                  value={user.users_phone}
                  setValue={setUsersPhone}
                  required
                />
              </article>
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Correo Electronico
                </label>
                <TextFieldOutlined
                  type={"email"}
                  label={"Email"}
                  value={user.users_email}
                  setValue={setUsersEmail}
                  required
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Dias de Limite de Pago
                </label>
                <TextFieldOutlined
                  type={"number"}
                  label={"numero de Días"}
                  value={user.users_providers_paydays}
                  setValue={setUsersLimitDayPayment}
                  required
                />
              </article>
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Fecha de Actualización - {formateData(user.users_providers_expiration_date)}
                </label>
                <TextFieldOutlined
                  type={"date"}
                  label={""}
                  value={user.users_providers_expiration_date}
                  setValue={setUsersExpiration}
                />
                <label className="block mx-2 text-base font-semibold dark:text-white">
                  Seleccione una nueva solo si desea cambiarla
                </label>
              </article>
            </div>
            <div className="flex justify-between">
              <Button name="Actualizar"/>
              { user.users_status == "ACTIVO"
                ? <button className="button button--flex mt-4 bg-[red]" onClick={handleSubmitInactiveProvider}>Inactivar Proveedor</button>
                : <button className="button button--flex mt-4 bg-[geen]" onClick={handleSubmitInactiveProvider}>Activar Proveedor</button>
              }
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditProviderForm;
