import axios from "axios";
import { useEffect } from "react";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { get, getHeader, remove, roles } from "../../../components/tools/SesionSettings";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";
import Routes from "../../../services/allRoutes";
import { useChangeStateFile } from "../../../redux/Redux-actions/useChangeStateFile";
import { useNavigate } from "react-router-dom";


export const usePending = () => {
  const { setPreLoad, rows, setRows } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();
  const { changeState } = useChangeStateFile();
  const navigate = useNavigate();

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
      .catch ((err) => {
        // @ts-ignore
        console.log("error ejecutado",err.response.data.message);
        // @ts-ignore
        const message = err.response.data.message;
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
      })
      .finally(() => setPreLoad(false));
  };

  const handleActionState = async () => {
    axios.post(Routes.api.stateFiles.getStateFilesToRole,{ idroles: get("idroles") },getHeader())
      .then((res) => changeState(res.data.data))
      .catch ((err) => {
        // @ts-ignore
        console.log("error ejecutado",err.response.data.message);
        // @ts-ignore
        const message = err.response.data.message;
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
      })
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
