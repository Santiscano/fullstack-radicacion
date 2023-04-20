import { useEffect, useState } from "react";
import LoadingMUI from "../../components/common/LoadingMUI";
import { showTableAllFiles } from "../../services/showTable.routes";
import useContextProvider from "./../../Context/GeneralValuesContext";
import DataTableAllFiles from "./components/DataTableAllFiles";

function AllFilesTable() {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContextProvider();

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await showTableAllFiles();
      const rows = await table?.data.dataInfo;
      setRow(rows ? rows : []);
      console.log("row table--: ", rows);
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  useEffect(() => {
    handleGetTableData();
  }, []);

  return (
    <>
      <LoadingMUI />
      <div className="layout">
        <section className="layout-section">
          <div className="layout-left">
            {/* <LoadingMUI/> */}
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
