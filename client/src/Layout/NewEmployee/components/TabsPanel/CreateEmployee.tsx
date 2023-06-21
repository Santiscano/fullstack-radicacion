import { FC, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TextFieldOutlined from "../../../../components/common/TextFieldOutline";
import useNewEmployee from "../../hooks/useNewEmployee";
import InputSelectCediName from "../Inputs/InputSelectCediName";
import InputSelectTypeDocument from "../Inputs/InputSelectTypeDocument";
import { useAppSelector } from "../../../../redux/hooks/useStore";
import { useEmployee } from "../../../../redux/Redux-actions/useEmployee";

const CreateEmployee:FC = () => {
  const { handleSubmitEmployee,  isCreatedEmployee } = useNewEmployee();
  const user = useAppSelector((state) => state.employeesSlice);
  const { setUsersIdentification, setUsersName, setUsersLastName, setUsersAddress, setUsersPhone, setUsersEmail } = useEmployee();

  useEffect(() => {
    console.log('validando inputs');
    console.log(isCreatedEmployee);
  },[handleSubmitEmployee])

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
      </Box>
      <form onSubmit={handleSubmitEmployee}>

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
              Telefono
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
        <div className="md:flex md:flex-wrap">
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

        <button className="button button--flex mt-6">Crear Empleado</button>
      </form>
    </>
  );
};

export default CreateEmployee;
