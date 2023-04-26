import { useContext, useEffect, useState } from "react";
import LoadingMUI from "../../components/common/LoadingMUI";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GeneralValuesContext } from "../../Context/GeneralValuesContext";
import { columnsCenterCosts } from "../../interfaces/GridColumns";
import {
  GridToolbarConfig,
  CustomNoRowsOverlay,
} from "../AllFilesTable/components/DataTableAllFiles";
import { centerCostTable } from "../../services/CenterCost.routes";

const TableAllCostCenter = () => {
  const [row, setRow] = useState([]);
  const { setPreLoad } = useContext(GeneralValuesContext);

  const handleGetTableData = async () => {
    try {
      setPreLoad(true);
      const table = await centerCostTable();
      console.log("rows: ", table);
      // setRow(table ? table : []);
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
            <h3 className="mx-[6vw] my-2 container_createFiling createFiling">
              Tabla Centros De Costos
            </h3>
            <div className="filing">
              <section className="viewTableEdit">
                <div className="flex flex-row justify-between">
                  <label className="block mb-2 ml-4 text-base font-semibold dark:text-white">
                    Centros De Costos
                  </label>
                </div>
                <Box sx={{ height: "90%", width: "100%" }}>
                  <DataGrid
                    rows={row}
                    // @ts-ignore
                    getRowId={(row) => row.id}
                    columns={columnsCenterCosts}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{
                      Toolbar: GridToolbarConfig,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    initialState={{
                      columns: {
                        columnVisibilityModel: {
                          id: false,
                        },
                      },
                    }}
                  />
                </Box>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TableAllCostCenter;
