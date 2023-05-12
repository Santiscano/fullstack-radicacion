import { Box, Modal } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "animate.css";
import LoadingMUI from "../../../../components/common/LoadingMUI";
import useSubmit from "../../Hooks/useSubmit";
import InputSelectRol from "../../../../components/common/InputSelectRol";
import InputSelectCedi from "../../../../components/common/InputSelectCedi";
import InputSelectDocType from "../../../../components/common/InputSelectDocType";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import Button from "../../../../components/common/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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

const CreateUserForm: FC<Props> = ({ open, close }) => {
  const {
    handleSubmitCreateUser,
    assignRole,
    handleRol,
    optionsRol,
    cedi,
    handleCedi,
    identificationType,
    handleCedity,
    identificationNumber,
    setIdentificationNumber,
    firstName,
    setFirstname,
    lastName,
    setLastName,
    address,
    setAddress,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
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
            <h1 className="p-2.5 text-3xl font-bold">Crear Usuario</h1>
            {/* @ts-ignore */}
            <button className="cursor-pointer" onClick={close}>
              <CloseOutlinedIcon />
            </button>
          </div>
          <form
            onSubmit={(event) => handleSubmitCreateUser(event, close)}
            className="mb-8"
          >
            <div className="md:flex md:flex-wrap">
              <article className="md:w-1/2">
                <InputSelectRol
                  type={"text"}
                  title="Asignar Rol"
                  placeholder="Rol"
                  name="role"
                  required
                  value={assignRole}
                  onChange={handleRol}
                  itemDefault="selecciona una opcion"
                  items={optionsRol}
                />
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
                  Apellidos
                </label>
                <TextFieldOutlined
                  type={"text"}
                  label={"Apellidos"}
                  value={lastName}
                  setValue={setLastName}
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
                  value={address}
                  setValue={setAddress}
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
                  value={phone}
                  setValue={setPhone}
                  required
                />
              </article>
            </div>
            <div className="md:flex md:flex-wrap">
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
              <article className="md:w-1/2">
                <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                  Contraseña
                </label>
                <TextFieldOutlined
                  type={"password"}
                  label={"contraseña"}
                  value={password}
                  setValue={setPassword}
                  required
                />
              </article>
            </div>
            <Button name="Crear Usuario" />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateUserForm;
