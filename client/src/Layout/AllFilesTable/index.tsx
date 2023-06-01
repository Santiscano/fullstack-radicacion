import { useEffect, useState } from "react";
import LoadingMUI from "../../components/common/LoadingMUI";
import { showTableAllFiles } from "../../services/showTable.routes";
import useContextProvider from "./../../Context/GeneralValuesContext";
import DataTableAllFiles from "./components/DataTableAllFiles";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal"
import { remove } from "../../components/tools/SesionSettings";
import { useNavigate } from "react-router-dom";


function AllFilesTable() {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContextProvider();
  const { changeTitleSection } = useDataGlobal();
  const navigate = useNavigate();

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await showTableAllFiles();
      const rows = await table?.data.data;
      setRow(rows ? rows : []);
      console.log("row table--: ", rows);
    } catch (err) {
      // @ts-ignore
      console.log("error ejecutado",err.response.data.message);
      // @ts-ignore
      const message = err.response.data.message;
      if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
        remove("accessToken");
        navigate("/login");
      }
    } finally {
      setPreLoad(false);
    }
  };

  useEffect(() => {
    handleGetTableData();
    changeTitleSection("TODOS LOS ARCHIVOS");
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
