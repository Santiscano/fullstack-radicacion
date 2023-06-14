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

const Documents = () => {
  const { handleDocuments } = useNewEmployee();
  const user = useAppSelector((state) => state.employeesSlice);
  const {} = useEmployee();

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
          CARGAR DOCUMENTOS
        </Typography>
      </Box>
      <form onSubmit={handleDocuments}>
        <div className="md:flex md:flex-wrap">
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              documents creation date
            </label>
          </article>
          <article className="md:w-1/2">
            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
              documents path
            </label>
          </article>
        </div>
        <button className="button button--flex mt-6">Guardar Documentos</button>
      </form>
    </>
  );
};

export default Documents;
