import { FC } from "react";
import { Box, Typography } from "@mui/material";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import useNewEmployee from "../../hooks/useNewEmployee";
import InputSelectDocTypeFormData from "../../../../components/common/InputSelectDocTypeFormData";
import InputOutlinedFormData from "../../../../components/common/InputOutlinedFormData";
import InputSelectCediName from "../Inputs/InputSelectCediName";
import InputSelectTypeDocument from "../Inputs/InputSelectTypeDocument";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";

const EmergencyContact = () => {
  const { handleEmergencyContact } = useNewEmployee();
  const user = useAppSelector((state) => state.employeesSlice);
  const { setEmergencyContactName, setEmergencyContactLastname,
    setEmergencyContactRelationship, setEmergencyContactPhone,
    setEmergencyContactCellPhone } = useEmployee();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
          INFORMACIÓN CONTACTO DE EMERGENCIA
        </Typography>
      </Box>
      <form onSubmit={handleEmergencyContact}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nombre Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Nombre Contacto"
              value={user.emergency_contact_name}
              setValue={setEmergencyContactName}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Apellidos Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Apellidos Contacto"
              value={user.emergency_contact_lastname}
              setValue={setEmergencyContactLastname}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Relación Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Relación Contacto "
              value={user.emergency_contact_relationship}
              setValue={setEmergencyContactRelationship}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Numero Telefonico Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Numero Telefonico"
              maxLength={7}
              value={user.emergency_contact_phone}
              setValue={setEmergencyContactPhone}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Numero Celular Contacto De Emergencia
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Numero Celular"
              maxLength={10}
              value={user.emergency_contact_cell_phone}
              setValue={setEmergencyContactCellPhone}
            />
          </article>
        </div>
        <button className="button button--flex mt-6">
          Guardar Contacto Emergencia
        </button>
      </form>
    </>
  );
};

export default EmergencyContact;
