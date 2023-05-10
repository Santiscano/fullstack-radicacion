import { useEffect } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal"


async function useTracking () {
  const { changeTitleSection } = useDataGlobal();
  const tracking = await

  useEffect(() => {
    changeTitleSection("Trazabilidad");
    return () => {
      changeTitleSection("")
    }
  },[])

  return {

  };
};

export default useTracking;
