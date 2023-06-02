import { useState } from "react";
import TestAutocomplete from "../../components/common/SearchDobleDepCity";
import useNewEmployee from "./hooks/useNewEmployee";
import InputOutlinedFormData from "../../components/common/InputOutlinedFormData";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import InputSelectDocTypeFormData from "../../components/common/InputSelectDocTypeFormData";
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from "@mui/material";

function NewEmployee() {
  const { handleSubmitEmployee } = useNewEmployee();

  return (
    <div className="layout">
      <section className="layout-section">
        <div className="layout-left">
          <article className="filing">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  color="success"
                  variant="buffer"
                  value={10}
                  valueBuffer={20}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
              <Typography variant="h5" color="green" >10%</Typography>
              </Box>
            </Box>
            <form onSubmit={handleSubmitEmployee}>
              <div className="md:flex md:flex-wrap">
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Nombre
                  </label>
                  <InputOutlinedFormData
                    label={"Nombre"}
                    name={"name"}
                    type={"text"}
                    required
                  />
                </article>
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Apellidos
                  </label>
                  <InputOutlinedFormData
                    label={"Apellidos"}
                    name={"lastname"}
                    type={"text"}
                    required
                  />
                </article>
              </div>
              <div className="md:flex md:flex-wrap">
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Dirección
                  </label>
                  <InputOutlinedFormData
                    label={"Dirección"}
                    name={"address"}
                    type={"text"}
                    required
                  />
                </article>
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Telefono
                  </label>
                  <InputOutlinedFormData
                    label={"Telefono"}
                    name={"phone"}
                    type={"number"}
                    required
                  />
                </article>
              </div>
              <div className="md:flex md:flex-wrap">
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Correo Electronico
                  </label>
                  <InputOutlinedFormData
                    label={"Correo Electronico"}
                    name={"email"}
                    type={"email"}
                    required
                  />
                </article>
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Tipo de Usuario
                  </label>
                  <TextFieldOutlined
                    type={"text"}
                    label={"Empleado"}
                    value={"Empleado"}
                    required
                    disabled
                  />
                </article>
              </div>
              <div className="md:flex md:flex-wrap">
                <article className="md:w-1/2">
                  <InputSelectDocTypeFormData
                    type={"text"}
                    title={"Tipo de Documento"}
                    placeholder="C.C, NIT..."
                    name={"identification_type"}
                    required
                    itemDefault="Seleccione un Tipo"
                  />
                </article>
                <article className="md:w-1/2">
                  <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                    Numero de Documento
                  </label>
                  <InputOutlinedFormData
                    label={"Numero de Documento"}
                    name={"identification"}
                    type={"number"}
                    required
                  />
                </article>
              </div>

              <button
                className="button button--flex mt-6"
                // type="submit"
              >
                Crear Empleado
              </button>
            </form>
          </article>
        </div>
      </section>
    </div>
  );
}

export default NewEmployee;
