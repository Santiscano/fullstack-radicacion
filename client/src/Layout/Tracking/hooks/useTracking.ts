import { useEffect, useState } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal"
import { getTrackingBySettled } from "../../../services/Tracking.routes";
import useContextProvider from "../../../Context/GeneralValuesContext";


function useTracking () {
  const [settled, setSettled] = useState("");
  const [success, setSuccess] = useState(false);
  const [notFile, setNotFile] = useState(false);
  const [tracking, setTracking] = useState([]);

  const { setPreLoad, handleMessageSnackbar } = useContextProvider()
  const { changeTitleSection } = useDataGlobal();
  // ---------------------submits tracking ---------------------------------//
  const handleTrackingBySettled = async (e:any) => {
    try{
      setPreLoad(true);
      e.preventDefault();
      const bySettled = await getTrackingBySettled(settled);
      console.log('bySettled: ', bySettled);
      if(bySettled?.status == 200){
        setSuccess(true);
        setNotFile(false);
        setTracking(bySettled?.data);
      } else {
        setSuccess(false);
        setNotFile(true);
        setTracking(bySettled?.data || []);
      }
    }catch(error){
      console.log(error);
      handleMessageSnackbar("error", "Error al cargar los datos");
    }finally{
      setPreLoad(false);
      console.log('tracking', tracking)
    }
  }

  const trackingByAccountType = () => {};

  useEffect(() => {
    changeTitleSection("Trazabilidad");
    return () => {
      changeTitleSection("")
    }
  },[])

  return {
    settled,
    setSettled,
    handleTrackingBySettled,
    success,
    notFile,
    tracking
  };
};

export default useTracking;
