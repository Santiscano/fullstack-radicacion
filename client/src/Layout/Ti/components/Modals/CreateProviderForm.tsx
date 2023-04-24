import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Modal } from "@mui/material";
import "animate.css";
import { FC } from "react";
import Button from "../../../../components/common/Button";
import InputSelectCedi from "../../../../components/common/InputSelectCedi";
import InputSelectDocType from "../../../../components/common/InputSelectDocType";
import LoadingMUI from "../../../../components/common/LoadingMUI";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import useSubmit from "../../Hooks/useSubmit";

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

interface Props {
  open: boolean;
  close:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

const CreateProviderForm: FC<Props> = ({ open, close }) => {
  const {
    handleSubmitCreateProvider,
    cedi,
    handleCedi,
    identificationType,
    handleCedity,
    identificationNumber,
    setIdentificationNumber,
    firstName,
    setFirstname,
    address,
    setAddress,
    phone,
    setPhone,
    email,
    setEmail,
    limitDaysPayment,
    setLimitDaysPayment,
    documentationUpdate,
    setDocumentationUpdate,
  } = useSubmit();
  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeIn"
      >
        <Box sx={style}>
          <LoadingMUI />
          <div className="flex justify-between items-center">
            <h1 className="p-2.5 text-3xl font-bold mb-3">Crear Proveedor</h1>
            {/* @ts-ignore */}
            <button className="cursor-pointer" onClick={close}>
              <CloseOutlinedIcon />
            </button>
          </div>
          <form onSubmit={(event) => handleSubmitCreateProvider(event)}>
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Asignar Rol
                </label>
                <TextFieldOutlined type={"text"} value={"PROVEEDOR"} disabled />
              </article>
              <article className="md:w-1/2">
                <InputSelectCedi
                  type={"text"}
                  title="Asignar Cedi"
                  placeholder="Cedi"
                  name="cedi"
                  required
                  value={cedi}
                  onChange={handleCedi}
                  itemDefault="selecciona una opcion"
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <InputSelectDocType
                  type={"text"}
                  title="Tipo de Documento"
                  placeholder="C.C, NIT..."
                  name="type"
                  required
                  value={identificationType}
                  onChange={handleCedity}
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
                  value={identificationNumber}
                  setValue={setIdentificationNumber}
                  required
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
                  value={firstName}
                  setValue={setFirstname}
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
                  value={address}
                  setValue={setAddress}
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
                  value={phone}
                  setValue={setPhone}
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
                  value={email}
                  setValue={setEmail}
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
                  value={limitDaysPayment}
                  setValue={setLimitDaysPayment}
                  required
                />
              </article>
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Fecha de Actualización
                </label>
                <TextFieldOutlined
                  type={"date"}
                  label={""}
                  value={documentationUpdate}
                  setValue={setDocumentationUpdate}
                  required
                />
              </article>
            </div>
            <Button name="Crear Proveedor" />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateProviderForm;
