import { GridColDef } from "@mui/x-data-grid";
import ButtonModalAllFiles from "../Layout/AllFilesTable/components/ButtonModalAllFiles";
import ButtonModalEdit from "../Layout/PendingFilesTable/components/common/ButtonModalEdit";
import { formattedAmount } from "../Utilities/formatted.utility";

// const columns = () => {}
export const columnsEdit: GridColDef[] = [
  {
    field: "files_registered",
    headerName: "Radicado",
    width: 230,
  },
  {
    field: "files_account_type",
    headerName: "Tipo de Factura",
    width: 130,
  },
  {
    field: "files_account_type_number",
    headerName: "Numero de Factura",
    width: 140,
  },
  {
    field: "files_code_accounting",
    headerName: "Codigo Contabilidad",
    width: 70,
  },
  {
    field: "users_name",
    headerName: "Razon Social",
    width: 120,
  },
  {
    field: "files_cost_center",
    headerName: "Centro de Costo",
    width: 150,
  },
  {
    field: "files_code_treasury",
    headerName: "Codigo Tesoreria",
    width: 70,
  },
  {
    field: "files_price",
    headerName: "Precio",
    width: 100,
    valueFormatter: (params) => formattedAmount(params.value),
  },
  {
    field: "files_type",
    headerName: "Tipo de Radicado",
    width: 150,
  },
  {
    field: "idfiles",
    headerName: "ID Radicado",
    width: 100,
  },
  {
    field: "idfiles_states",
    headerName: "ID Estado Archivo",
    width: 105,
  },
  {
    field: "files_states",
    headerName: "Estado Archivo",
    width: 160,
  },
  {
    field: "UserAssignedName",
    headerName: "Responsable Actual",
    width: 140,
  },
  {
    field: "idproviders",
    headerName: "ID Proveedor",
    width: 70,
  },
  {
    field: "idroles",
    headerName: "ID Role",
    width: 70,
  },
  {
    field: "idsedes",
    headerName: "ID Cedi",
    width: 70,
  },
  {
    field: "idusers",
    headerName: "ID Usuario",
    width: 70,
  },
  {
    field: "sedes_address",
    headerName: "Direccion",
    width: 70,
  },
  {
    field: "sedes_city",
    headerName: "Ciudad Cedi",
    width: 70,
  },
  {
    field: "sedes_country",
    headerName: "Pais Cedi",
    width: 70,
  },
  {
    field: "sedes_name",
    headerName: "Nombre Cedi",
    width: 70,
  },
  {
    field: "sedes_type",
    headerName: "Tipo de Cedi",
    width: 70,
  },
  {
    field: "users_address",
    headerName: "Direccion Usuario",
    width: 70,
  },
  {
    field: "users_email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "users_identification",
    headerName: "Numero Identificacion",
    width: 70,
  },
  {
    field: "users_identification_digital_check",
    headerName: "Digital Check",
    width: 70,
  },
  {
    field: "users_identification_type",
    headerName: "Tipo identificacion",
    width: 70,
  },
  {
    field: "users_lastname",
    headerName: "Apellido",
    width: 70,
  },
  {
    field: "users_phone",
    headerName: "Celular",
    width: 70,
  },
  {
    field: "users_providers_expiration_date",
    headerName: "Expiracion usuario",
    width: 70,
  },
  {
    field: "users_providers_paydays",
    headerName: "paydays users",
    width: 70,
  },
  {
    field: "users_status",
    headerName: "Estado del Usuario",
    width: 70,
  },
  {
    field: "action",
    headerName: "Acciones",
    width: 90,
    filterable: false,
    renderCell: (cellValues: any) => ButtonModalEdit(cellValues),
    // renderCell: (cellValues: any) => {
    //   return (
    //     <>
    //       <Button
    //         component="button"
    //         variant="contained"
    //         size="small"
    //         style={{ marginLeft: 1 }}
    //         onKeyDown={(event: React.KeyboardEvent) => {
    //           if (event.key === " ") {
    //             // Prevent key navigation when focus is on button
    //             event.stopPropagation();
    //           }
    //         }}
    //         onClick={(event) => {
    //           console.log("result: ", event, cellValues);
    //         }}
    //       >
    //         ver valores
    //       </Button>
    //       <ModalInfoFile
    //         key={}
    //         open={openModalAuth}
    //         close={handleOpenModalAuth}
    //         valueFile={params.row}
    //       />
    //     </>
    //   );
    // },
    // renderCell: ButtonOpenModalEdit,
  },
];

export const columnsAllFiles: GridColDef[] = [
  {
    field: "files_registered",
    headerName: "Radicado",
    width: 230,
  },
  {
    field: "files_account_type",
    headerName: "Tipo de Factura",
    width: 130,
  },
  {
    field: "files_account_type_number",
    headerName: "Numero de Factura",
    width: 140,
  },
  {
    field: "files_code_accounting",
    headerName: "Codigo Contabilidad",
    width: 70,
  },
  {
    field: "users_name",
    headerName: "Razon Social",
    width: 120,
  },
  {
    field: "files_cost_center",
    headerName: "Centro de Costo",
    width: 150,
  },
  {
    field: "files_code_treasury",
    headerName: "Codigo Tesoreria",
    width: 70,
  },
  {
    field: "files_price",
    headerName: "Precio",
    width: 100,
    valueFormatter: (params) => formattedAmount(params.value),
  },
  {
    field: "files_type",
    headerName: "Tipo de Radicado",
    width: 150,
  },
  {
    field: "idfiles",
    headerName: "ID Radicado",
    width: 100,
  },
  {
    field: "idfiles_states",
    headerName: "ID Estado Archivo",
    width: 105,
  },
  {
    field: "files_states",
    headerName: "Estado Archivo",
    width: 160,
  },
  {
    field: "UserAssignedName",
    headerName: "Responsable Actual",
    width: 140,
  },
  {
    field: "idproviders",
    headerName: "ID Proveedor",
    width: 70,
  },
  {
    field: "idroles",
    headerName: "ID Role",
    width: 70,
  },
  {
    field: "idsedes",
    headerName: "ID Cedi",
    width: 70,
  },
  {
    field: "idusers",
    headerName: "ID Usuario",
    width: 70,
  },
  {
    field: "sedes_address",
    headerName: "Direccion",
    width: 70,
  },
  {
    field: "sedes_city",
    headerName: "Ciudad Cedi",
    width: 70,
  },
  {
    field: "sedes_country",
    headerName: "Pais Cedi",
    width: 70,
  },
  {
    field: "sedes_name",
    headerName: "Nombre Cedi",
    width: 70,
  },
  {
    field: "sedes_type",
    headerName: "Tipo de Cedi",
    width: 70,
  },
  {
    field: "users_address",
    headerName: "Direccion Usuario",
    width: 70,
  },
  {
    field: "users_email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "users_identification",
    headerName: "Numero Identificacion",
    width: 70,
  },
  {
    field: "users_identification_digital_check",
    headerName: "Digital Check",
    width: 70,
  },
  {
    field: "users_identification_type",
    headerName: "Tipo identificacion",
    width: 70,
  },
  {
    field: "users_lastname",
    headerName: "Apellido",
    width: 70,
  },
  {
    field: "users_phone",
    headerName: "Celular",
    width: 70,
  },
  {
    field: "users_providers_expiration_date",
    headerName: "Expiracion usuario",
    width: 70,
  },
  {
    field: "users_providers_paydays",
    headerName: "paydays users",
    width: 70,
  },
  {
    field: "users_status",
    headerName: "Estado del Usuario",
    width: 70,
  },
  {
    field: "action",
    headerName: "Acciones",
    width: 90,
    filterable: false,
    renderCell: (cellValues: any) => ButtonModalAllFiles(cellValues),
    // renderCell: (cellValues: any) => {
    //   return (
    //     <>
    //       <Button
    //         component="button"
    //         variant="contained"
    //         size="small"
    //         style={{ marginLeft: 1 }}
    //         onKeyDown={(event: React.KeyboardEvent) => {
    //           if (event.key === " ") {
    //             // Prevent key navigation when focus is on button
    //             event.stopPropagation();
    //           }
    //         }}
    //         onClick={(event) => {
    //           console.log("result: ", event, cellValues);
    //         }}
    //       >
    //         ver valores
    //       </Button>
    //       <ModalInfoFile
    //         key={}
    //         open={openModalAuth}
    //         close={handleOpenModalAuth}
    //         valueFile={params.row}
    //       />
    //     </>
    //   );
    // },
    // renderCell: ButtonOpenModalEdit,
  },
];
