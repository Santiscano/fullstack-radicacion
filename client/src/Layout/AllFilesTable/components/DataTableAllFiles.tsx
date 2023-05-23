import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import NotFound from "../../../assets/images/notFile.jpg";
import useContextProvider from "../../../Context/GeneralValuesContext";
import LoadingMUI from "../../../components/common/LoadingMUI";
import { columnsAllFiles } from "../../../interfaces/GridColumns";
import { useModalUserView } from "../../../redux/Redux-actions/useModalUserView";
import ModalInfoFile from "./ModalInfo";
import "./datagrid.css";

export function GridToolbarConfig() {
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
/**
 * con esta funcion se validara si el archivo esta por vencer
 * @param params valor que recibire con el que se validara si esta por expirar para mostrar por color
 * @returns
 */
const delayAlerts = (params: any) => {
  // console.log("params", params);
  if (params.row.files_type == "ADMINISTRATIVO" && params.row.idfiles !== 199) {
    return "willExpireSoon";
  } else if (params.row.idfiles == 199) {
    // console.log("resolvi por aqui", params.row);
    return "overduePending";
  } else {
    return "good";
  }
};

export default function DataTableAllFiles({ row }: any) {
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const { addModalUser } = useModalUserView()

  const handleView = (params: any) => {
    addModalUser(params.row);
    handleOpenModalAuth();
  };
  return (
    <>
      <LoadingMUI />
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={row}
          getRowId={(row) => row.idfiles}
          columns={columnsAllFiles}
          onRowDoubleClick={handleView}
          // pageSize={7}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          // getRowClassName={delayAlerts}
          components={{
            Toolbar: GridToolbarConfig,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                files_cost_center: false,
                files_code_accounting: false,
                files_code_treasury: false,
                files_type: false,
                idfiles: false,
                idfiles_states: false,
                idproviders: false,
                idroles: false,
                idsedes: false,
                idusers: false,
                sedes_address: false,
                sedes_city: false,
                sedes_country: false,
                sedes_name: false,
                sedes_type: false,
                users_address: false,
                users_email: false,
                users_identification: false,
                users_identification_digital_check: false,
                users_identification_type: false,
                users_lastname: false,
                users_phone: false,
                users_providers_expiration_date: false,
                users_providers_paydays: false,
                users_status: false,
              },
            },
            pagination: { pageSize: 25 },
          }}
        />
      </Box>
      {openModalAuth && (
        <ModalInfoFile/>
      )}
    </>
  );
}
