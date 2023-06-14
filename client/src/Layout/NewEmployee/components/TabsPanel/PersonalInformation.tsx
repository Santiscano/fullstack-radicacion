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

const PersonalInformation = () => {
  const { handleSubmitPersonalInformation } = useNewEmployee();
  const user = useAppSelector((state) => state.employeesSlice);
  const { setCompensationFund, setPension, setLayoffs, setEps, setArl, setMedicalEmergency,
    setArlEmergency, setRh, setAcademicLevel, setBirthdate, setGender, setCivilStatus,
    setCity, setShirtSize, setPantSize, setShoeSize } = useEmployee();

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
          INFORMACIÓN PERSONAL
        </Typography>
      </Box>
      <form onSubmit={handleSubmitPersonalInformation}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Caja de Compensación Familiar
            </label>
            <TextFieldOutlined
              type={"text"}
              label="caja compensación"
              value={user.compensation_fund}
              setValue={setCompensationFund}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Pensión
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Pensión"
              value={user.pension}
              setValue={setPension}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Cesantías
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Cesantías"
              value={user.layoffs}
              setValue={setLayoffs}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              EPS
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Eps"
              value={user.eps}
              setValue={setEps}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              ARL
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Arl"
              value={user.arl}
              setValue={setArl}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Emergencia médica
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Emergencia Médica"
              value={user.medical_emergency}
              setValue={setMedicalEmergency}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Emergecia ARL
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Emergencia Arl"
              value={user.arl_emergency}
              setValue={setArlEmergency}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              RH
            </label>
            <TextFieldOutlined
              type={"text"}
              label="RH"
              value={user.rh}
              setValue={setRh}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Nivel Academico
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Nivel Academico"
              value={user.academic_level}
              setValue={setAcademicLevel}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Cumpleaños
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Cumpleaños"
              value={user.birthdate}
              setValue={setBirthdate}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Genero
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Genero"
              value={user.gender}
              setValue={setGender}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Estado Civil
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Estado Civil"
              value={user.civil_status}
              setValue={setCivilStatus}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Ciudad
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Ciudad"
              value={user.city}
              setValue={setCity}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Talla Camisa
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Talla Camisa"
              value={user.shirt_size}
              setValue={setShirtSize}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Talla Pantalón
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Talla Pantalón"
              value={user.pant_size}
              setValue={setPantSize}
            />
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Talla Zapatos
            </label>
            <TextFieldOutlined
              type={"text"}
              label="Talla Zapatos"
              value={user.shoe_size}
              setValue={setShoeSize}
            />
          </article>
        </div>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              Fotografia
            </label>
          </article>
        </div>
        <button className="button button--flex mt-6">
          Guardar Informacion Personal
        </button>
      </form>
    </>
  );
};

export default PersonalInformation;
