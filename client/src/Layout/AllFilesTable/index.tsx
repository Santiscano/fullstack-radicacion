import DataTableAllFiles from "./components/DataTableAllFiles";
import { useEffect, useState, useContext } from "react";
import { showTableAllFiles } from "../../services/showTable.routes";
import { GeneralValuesContext } from "./../../Context/GeneralValuesContext";
import LoadingMUI from "../../components/common/LoadingMUI";

function AllFilesTable() {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContext(GeneralValuesContext);

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await showTableAllFiles();
      const rows = await table?.data.dataInfo;
      setRow(rows ? rows : []);
      // console.log("row table--: ", rows);
    } catch (error) {
      console.log("error: ", error);
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
