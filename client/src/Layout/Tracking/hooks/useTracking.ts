import { useEffect } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal"


function useTracking () {
  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection("Trazabilidad")
    return () => {
      changeTitleSection("")
    }
  },[])

  return {

  };
};

export default useTracking;
