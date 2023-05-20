import axios from "axios";
import { useEffect } from "react";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { get, getHeader, roles } from "../../../components/tools/SesionSettings";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";
import Routes from "../../../services/allRoutes";
import { useChangeStateFile } from "../../../redux/Redux-actions/useChangeStateFile";


export const usePending = () => {
  const { setPreLoad, rows, setRows } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();
  const { changeState } = useChangeStateFile();

  const title = () => {
    const value = Number(get("idroles")) == roles.Administrador ? "COMPLETADOS" : "MIS ARCHIVOS PENDIENTES";
    changeTitleSection(value)
  };

  const handleGetTableData = async () => {
    axios.post(Routes.api.tables.pending, {idusers: get("idusers")}, getHeader())
      .then((res) => {
        console.log(res)
        setRows(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setPreLoad(false));
  };

  const handleActionState = async () => {
    axios.post(Routes.api.stateFiles.getStateFilesToRole,{ idroles: get("idroles") },getHeader())
      .then((res) => changeState(res.data.data))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    handleGetTableData();
    handleActionState();
    title();
    return () => {
      changeTitleSection("");
    };
  },[])

  return {
    rows,
  };
};
