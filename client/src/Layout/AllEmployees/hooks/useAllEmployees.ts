import { useEffect } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";

function useAllEmployees(){
  const { changeTitleSection } = useDataGlobal();
  useEffect(() => {
    changeTitleSection("TODOS LOS EMPLEADOS");
    return () => {
      changeTitleSection("");
    };
  },[]);

  return {};
};

export default useAllEmployees;
