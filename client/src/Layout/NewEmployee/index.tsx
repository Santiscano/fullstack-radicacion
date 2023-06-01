import { useState } from "react";
import TestAutocomplete from "../../components/common/SearchDobleDepCity";
import useNewEmployee from "./hooks/useNewEmployee";

function NewEmployee() {
  const {} = useNewEmployee();

  return (
    <>
      <h2>Crear nuevos empleados</h2>
    </>
  );
}

export default NewEmployee;
