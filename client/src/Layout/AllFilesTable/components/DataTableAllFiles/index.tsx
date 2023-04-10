import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import NotFound from "../../../../assets/images/notFile.jpg";
import pdf from "../../../../assets/Requerimientos.pdf";
import LoadingMUI from "../../../../components/common/LoadingMUI";
import { columnsAllFiles } from "../../../../interfaces/GridColumns";
import "./datagrid.css";

let open: boolean = false;
const openModalPDF = (params: any) => {
  console.log("open: ", open);
  let parameters = params;
  console.log("parameters: ", parameters);
  open = true;
  console.log("open: ", open);
};
const openPdf = () => {
  console.log("funcionando");
  window.open(pdf);
};

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

function getRowId(row: any) {
  return row.idfiles;
}

const delayAlerts = (params: any) => {
  console.log("params", params);
  if (params.row.files_type == "ADMINISTRATIVO" && params.row.idfiles !== 199) {
    return "willExpireSoon";
  } else if (params.row.idfiles == 199) {
    console.log("resolvi por aqui", params.row);
    return "overduePending";
  } else {
    return "good";
  }
};

export default function DataTableAllFiles({ row }: any) {
  // console.log("row: ", row);
  // console.log("rowprice: ", row.files_price);
  return (
    <>
      <LoadingMUI />
      <div className="flex flex-row justify-between">
        <label className="block mb-2 ml-4 text-base font-semibold dark:text-white">
          Todos Los Radicados
        </label>
      </div>
      <Box sx={{ height: "90%", width: "100%" }}>
        <DataGrid
          rows={row}
          getRowId={getRowId}
          columns={columnsAllFiles}
          pageSize={7}
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          getRowClassName={delayAlerts}
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
          }}
        />
      </Box>
    </>
  );
}
