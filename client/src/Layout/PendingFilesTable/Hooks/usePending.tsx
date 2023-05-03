import { useEffect } from "react";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { showTablePending } from "../../../services/showTable.routes";

export const usePending = () => {
  // const [row, setRow] = useState([]);
  const { setPreLoad, handleCloseModalAuth, rows, setRows } =
    useContextProvider();

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
  }, []);

  useEffect(() => {
    handleGetTableData();
  }, []);

  return {
    rows,
  };
};
