import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import NotFound from "../../../../assets/images/notFile.jpg";
import { columnsProvider } from "../../../../interfaces/GridColumns";
import { useEffect, useState } from "react";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import { getUsers } from "../../../../services/Users.routes";
import { roles } from "../../../../components/tools/SesionSettings";
import CreateProviderForm from "../Modals/CreateProviderForm";

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

const ProvidersTables = ({ setIsCreateProvider }: any) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const { setPreLoad } = useContextProvider();

  const handleGetUsers = async () => {
    try {
      setPreLoad(true);
      const listUsers = await getUsers();
      const filterUsers = listUsers.filter(
        (user: { idroles: number }) => user.idroles == roles.Proveedor
      );
      console.log("response getusers: filter", filterUsers);
      setRows(filterUsers);
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
        <label className="block mb-2 ml-4 text-base font-semibold dark:text-white">
          Todos Los Proveedores
        </label>
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
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{
              Toolbar: GridToolbarConfig,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
          />
        </Box>
      </section>
      <CreateProviderForm open={open} close={handleCloseModal} />
    </>
  );
};

export default ProvidersTables;
