import { useEffect, useState } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";

function useNewEmployee(){
  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection("CREAR EMPLEADO");
    return () => {
      changeTitleSection("");
    };
  },[]);

  return {};
};

export default useNewEmployee;
