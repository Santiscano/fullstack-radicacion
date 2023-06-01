import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import NotFound from "../../../../assets/images/notFile.jpg";
import { columnsProvider } from "../../../../interfaces/GridColumns";
import { useModalUserView } from "../../../../redux/Redux-actions/useModalUserView";
import { useProvider } from "../../Hooks/useProvider";
import CreateProviderForm from "../Modals/CreateProviderForm";
import EditProviderForm from "../Modals/EditProviderForm";
import { useState } from "react";

function GridToolbarConfig() {
  return (
    <div>
      <GridToolbarColumnsButton style={{ color: "#000", marginLeft: "17px" }} />
      <GridToolbarFilterButton style={{ color: "#000", marginLeft: "17px" }} />
      <GridToolbarExport style={{ color: "#000", marginLeft: "17px" }} />
    </div>
  );
}
const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  height: "100%",
  "& .MuiBox-root":{
    padding: 0,
  },
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));
export function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <img src={NotFound} width="250px" />
    </StyledGridOverlay>
  );
}

const ProvidersTables = () => {
  const { rows, open, handleOpen, handleCloseModal, handleClearDataProviders } = useProvider()
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const { addModalUser } = useModalUserView();

  const handleView = (params: any) => {
    console.log('params: ', params.row);
    addModalUser(params.row);
    handleOpenModalAuth();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <label className="block ml-4 text-base font-semibold dark:text-white">
          PROVEEDORES
        </label>
        <button className="button button--flex" onClick={handleClearDataProviders}>
          Actualizar Tabla Proveedores
        </button>
        <button className="button button--flex" onClick={handleOpen}>
          Nuevo Proveedor
        </button>
      </div>
      <section className="viewTableEdit">
        <Box sx={{ height: "90%", width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.idusers}
            columns={columnsProvider}
            onRowDoubleClick={handleView}
            // pageSize={7}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{
              Toolbar: GridToolbarConfig,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            initialState={{
              pagination: { pageSize: 25 },
            }}
          />
        </Box>
      </section>
      <CreateProviderForm open={open} close={handleCloseModal} />
      {openModalAuth && (
        <EditProviderForm />
      )}
    </>
  );
};

export default ProvidersTables;
