import axios from "axios";
import { useEffect } from "react";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { get, getHeader, roles } from "../../../components/tools/SesionSettings";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";
import allRoutes from "../../../services/allRoutes";


export const usePending = () => {
  const { setPreLoad, rows, setRows } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();

  const title = () => {
    const value = Number(get("idroles")) == roles.Administrador ? "COMPLETADOS" : "MIS ARCHIVOS PENDIENTES";
    changeTitleSection(value)
  };

  const handleGetTableData = async () => {
    axios.post(allRoutes.api.tables.pending, {idusers: get("idusers")}, getHeader())
      .then((res) => {
        console.log(res)
        setRows(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setPreLoad(false));
  };

  useEffect(() => {
    handleGetTableData();
    title();
    return () => {
      changeTitleSection("");
    };
  },[])

  return {
    rows,
  };
};
