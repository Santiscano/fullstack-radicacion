import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import NotFound from "../../../../assets/images/notFile.jpg";
import { columnsUsers } from "../../../../interfaces/GridColumns";
import { useEffect, useState } from "react";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import { getUsers, getUsersNotAdminProv } from "../../../../services/Users.routes";
import { roles } from "../../../../components/tools/SesionSettings";
import CreateUserForm from "../Modals/CreateUserForm";

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

const UsersTables = ({ setIsCreateUser }: any) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const { setPreLoad } = useContextProvider();

  const handleGetUsers = async () => {
    try {
      setPreLoad(true);
      const listUsers = await getUsersNotAdminProv();
      console.log("response getusers: filter", listUsers);
      setRows(listUsers);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setPreLoad(false);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <label className="block ml-4 text-base font-semibold dark:text-white">
          Todos Los Usuarios
        </label>
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
        <CreateUserForm open={open} close={handleCloseModal} />
      </section>
    </>
  );
};

export default UsersTables;
