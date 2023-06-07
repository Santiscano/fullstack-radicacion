import { useEffect } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";

function useAttachEmployee(){
  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection('ACTUALIZAR EMPLEADO');
    return () => {
      changeTitleSection('');
    };
  },[]);

  return {};
};

export default useAttachEmployee;
