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
import { columnsUsers } from "../../../../interfaces/GridColumns";
import { useModalUserView } from "../../../../redux/Redux-actions/useModalUserView";
import { useUsers } from "../../Hooks/useUsers";
import CreateUserForm from "../Modals/CreateUserForm";
import EditUserForm from "../Modals/EditUserForm";

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

const UsersTables = () => {
  const { rows, open, handleOpen, handleCloseModal, handleClearDataUsers } = useUsers();
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const { addModalUser } = useModalUserView();

  const handleView = (params: any) => {
    console.log('params: ', params);
    addModalUser(params.row);
    handleOpenModalAuth();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center py-0">
        <label className="block ml-4 text-base font-semibold dark:text-white">
          USUARIOS
        </label>
        <button className="button button--flex" onClick={handleClearDataUsers}>
          actualizar Tabla Usuarios
        </button>
        <button className="button button--flex" onClick={handleOpen}>
          Nuevo Usuario
        </button>
      </div>
      <section className="viewTableEdit">
        <Box sx={{ height: "90%", width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.idusers}
            columns={columnsUsers}
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
      <CreateUserForm open={open} close={handleCloseModal} />
      {openModalAuth && (
        <EditUserForm/>
      )}
    </>
  );
};

export default UsersTables;
