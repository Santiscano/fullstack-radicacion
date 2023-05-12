import { useEffect, useState } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal"
import { getTrackingByAccountType, getTrackingBySettled } from "../../../services/Tracking.routes";
import useContextProvider from "../../../Context/GeneralValuesContext";


function useTracking () {
  const [settled, setSettled] = useState("");
  const [document, setDocument] = useState({
    type: "",
    number: "",
  });
  const [success, setSuccess] = useState(false);
  const [notFile, setNotFile] = useState(false);
  const [tracking, setTracking] = useState([]);

  // --------------SETSTATES ---------------//
  const onType = (newValue: any) => {
    setDocument({
      ...document,
      type: newValue,
    });
  };
  const onNumber = (newValue: any) => {
    setDocument({
      ...document,
      number: newValue,
    });
  };
  const onClean = () => {
    setDocument({
      ...document,
      type: "",
      number: "",
    });
  };

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
      console.log('tracking by settled: ', tracking);
    }
  }

  const trackingByAccountType = async (e:any) => {
    try{
      setPreLoad(true);
      e.preventDefault();
      const byDocument = await getTrackingByAccountType(document.type, document.number);
      console.log('byDocument: ', byDocument);
      if(byDocument?.status == 200){
        setSuccess(true);
        setNotFile(false);
        setTracking(byDocument?.data);
      } else {
        setSuccess(false);
        setNotFile(true);
        setTracking(byDocument?.data || []);
      }
    }catch(error){
      console.log(error);
      handleMessageSnackbar("error", "Error al cargar los datos");
    }finally{
      setPreLoad(false);
      console.log('tracking by Account: ', tracking)
    }
  };

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
    document,
    onType,
    onNumber,
    onClean,
    trackingByAccountType,
    success,
    notFile,
    tracking
  };
};

export default useTracking;
