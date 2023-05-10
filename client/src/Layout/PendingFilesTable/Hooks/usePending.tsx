import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { showTablePending } from "../../../services/showTable.routes";
import { fetchTableFiles } from "../../../redux/Redux-reducer/tableFilesSlice";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal"
import { get, roles } from "../../../components/tools/SesionSettings";


export const usePending = () => {
  // const [row, setRow] = useState([]);
  const { setPreLoad, rows, setRows } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();

  const title = () => {
    const value = Number(get("idroles")) == roles.Administrador ? "Completadas" : "Pendientes por Autorizar";
    changeTitleSection(value)
  };

  const dispatch = useDispatch();
  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await showTablePending();
      const rowsData = await table?.data.data;
      console.log("rowsData: ", rowsData);
      setRows(rowsData ? rowsData : []);
      console.log("row table--: ", rowsData);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  useEffect(() => {
    handleGetTableData();
    // @ts-ignore
    dispatch(fetchTableFiles());
  }, [dispatch]);

  useEffect(() => {
    title();
    return () => {
      changeTitleSection("");
    };
  },[])

  return {
    rows,
  };
};
