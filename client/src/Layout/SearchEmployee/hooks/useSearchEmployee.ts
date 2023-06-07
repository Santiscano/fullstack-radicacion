import { useEffect } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";

function useSearchEmployee(){
  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection("BUSCAR EMPLEADO");
    return () => {
      changeTitleSection("");
    };
  },[]);

  return {};
};

export default useSearchEmployee;
