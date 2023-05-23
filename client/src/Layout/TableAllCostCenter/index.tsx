import { useContext, useEffect, useState } from "react";
import LoadingMUI from "../../components/common/LoadingMUI";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columnsCenterCosts } from "../../interfaces/GridColumns";
import {
  GridToolbarConfig,
  CustomNoRowsOverlay,
} from "../AllFilesTable/components/DataTableAllFiles";
import { centerCostTable } from "../../services/CenterCost.routes";
import useCostCenter from "./hooks/useCostCenter";

const TableAllCostCenter = () => {
  const {row} = useCostCenter();

  return (
    <>
      <LoadingMUI />
      <div className="layout">
        <section className="layout-section">
          <div className="layout-left">

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
                      pagination: { pageSize: 25 },
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
