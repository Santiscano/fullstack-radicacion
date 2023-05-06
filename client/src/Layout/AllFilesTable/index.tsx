import { useEffect, useState } from "react";
import LoadingMUI from "../../components/common/LoadingMUI";
import { showTableAllFiles } from "../../services/showTable.routes";
import useContextProvider from "./../../Context/GeneralValuesContext";
import DataTableAllFiles from "./components/DataTableAllFiles";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal"


function AllFilesTable() {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await showTableAllFiles();
      const rows = await table?.data.data;
      setRow(rows ? rows : []);
      console.log("row table--: ", rows);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  useEffect(() => {
    handleGetTableData();
    changeTitleSection("Todos los Archivos");
    return () => {
      changeTitleSection("")
    }
  }, []);

  return (
    <>
      <LoadingMUI />
      <div className="layout">
        <section className="layout-section">
          <div className="layout-left">
            <h3 className="container__createFiling createFiling">
              Todos los archivos
            </h3>
            <div className="filing">
              <section className="viewTableEdit">
                <DataTableAllFiles row={row} />
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AllFilesTable;
