import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Divider, Modal } from "@mui/material";
import "animate.css";
import { FC } from "react";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import { formateData } from "../../../../Utilities/formatted.utility";
import Button from "../../../../components/common/Button";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import { useModalUserView } from "../../../../redux/Redux-actions/useModalUserView";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import useSubmit from "../../Hooks/useSubmit";
import InputEditCedi from "../common/InputEditCedi";
import InputEditDocumentType from "../common/InputEditDocumentType";
import InputSelectRol from "../../../../components/common/InputSelectRol";
import InputSelectCedi from "../../../../components/common/InputSelectCedi";
import InputEditRol from "../common/InputEditRol";
import InputSelectDocType from "../../../../components/common/InputSelectDocType";

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

interface Props {};

const EditUserForm: FC<Props> = () => {
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const user = useAppSelector((state) => state.modalUserViewSlice);
  const { handleSubmitUpdateUser, handleSubmitInactiveUser } = useSubmit();
  const { setUsersIdentification, setUsersName, setUsersLastName, setUsersAddress, setUsersPhone, setUsersEmail  } = useModalUserView()
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
            <h3 className="p-2.5 text-3xl font-bold mb-3">Editar Usuario</h3>
            <CloseOutlinedIcon
              onClick={handleOpenModalAuth}
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
          </div>
          <Divider />
          <form onSubmit={(e) => handleSubmitUpdateUser(e)} className="mb-8">
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <InputEditRol
                  type={"text"}
                  title="Asignar Rol"
                  placeholder="Rol"
                  name="Rol"
                  required
                  itemDefault="selecciona una opcion"
                />
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
                  disabled
                  itemDefault="selecciona un tipo"
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
                  Apellidos
                </label>
                <TextFieldOutlined
                  type={"text"}
                  label={"Apellidos"}
                  value={user.users_lastname}
                  setValue={setUsersLastName}
                  required
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
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
            </div>
            <div className="flex justify-between">
              <Button name="Actualizar"/>
              { user.users_status == "ACTIVO"
                ? <button className="button button--flex mt-4 bg-[red]" onClick={handleSubmitInactiveUser}>Inactivar Usuario</button>
                : <button className="button button--flex mt-4 bg-[geen]" onClick={handleSubmitInactiveUser}>Activar Usuario</button>
              }
            </div>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default EditUserForm
