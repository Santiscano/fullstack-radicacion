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

const Hiring = () => {
  const { handleSubmitHiring } = useNewEmployee();
  const user = useAppSelector((state) => state.employeesSlice);
  const { setTypeContratationName, setPositionName, setCompanyName, setCompanyAddress,
    setCompanyPhone, setHiringEntryDate, setHiringDepartureDate, setHiringSalary,
    setHiringCostCenter, setPersonaleInformationViculationDate } = useEmployee();

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
          CONTRATACIÓN
        </Typography>
      </Box>
      <form onSubmit={handleSubmitHiring}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Tipo De Contratación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Tipo De Contratación"
              value={user.type_contratation_name}
              setValue={setTypeContratationName}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nombre Posición Laboral
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Nombre Posición Laboral"
              value={user.position_name}
              setValue={setPositionName}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nombre Empresa
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Nombre Empresa"
              value={user.company_name}
              setValue={setCompanyName}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Direccion Empresa
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Direccion Empresa"
              value={user.company_address}
              setValue={setCompanyAddress}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Telefono Empresa
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Telefono Empresa"
              value={user.company_phone}
              setValue={setCompanyPhone}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Datos Personales Fecha De Viculación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="caja compensación"
              value={user.personale_information_viculation_date}
              setValue={setPersonaleInformationViculationDate}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fecha De Ingreso Contratación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Fecha De Ingreso Contratación"
              value={user.hiring_entry_Date}
              setValue={setHiringEntryDate}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fecha De Salida Contratación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Fecha De Salida Contratación"
              value={user.hiring_departure_date}
              setValue={setHiringDepartureDate}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Salario Contratación
            </label>
            <TextFieldOutlined
              type={"number"}
              label="Salario Contratación"
              value={user.hiring_salary}
              setValue={setHiringSalary}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Centro De Costos De Contratación
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Centro De Costos De Contratación"
              value={user.hiring_cost_center}
              setValue={setHiringCostCenter}
            />
          </article>
        </div>
        <button className="button button--flex mt-6">
          Guardar Información Contratación
        </button>
      </form>
    </>
  );
};

export default Hiring;
