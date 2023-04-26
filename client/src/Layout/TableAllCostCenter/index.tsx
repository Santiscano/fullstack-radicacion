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
      console.log("rows: ", table.data);
      const rows = table?.data;
      setRow(rows ? rows : []);
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
                <Box sx={{ height: "95%", width: "100%" }}>
                  <DataGrid
                    rows={row}
                    // @ts-ignore
                    getRowId={(row) => (row.id ? row.id : 0)}
                    columns={columnsCenterCosts}
                    // pageSize={5}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
                      pagination: { pageSize: 5 },
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
