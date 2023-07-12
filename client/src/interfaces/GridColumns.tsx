import { GridColDef } from "@mui/x-data-grid";
import { formattedAmount, AgeToBirthday } from "../Utilities/formatted.utility";
import { width } from "@mui/system";
import ButtonModalUsersTable from "../Layout/Ti/components/common/ButtonModalUsersTable";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import avatarIcon from '../assets/images/avatars/avatar_1.jpg';

// const columns = () => {}
export const columnsEdit: GridColDef[] = [
  {
    field: "files_registered",
    headerName: "Radicado",
    width: 180,
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
    headerName: "Codigo Causación",
    width: 70,
  },
  {
    field: "users_name",
    headerName: "Razon Social",
    width: 180,
  },
  {
    field: "files_cost_center",
    headerName: "Centro de Costo",
    width: 150,
  },
  {
    field: "files_code_treasury",
    headerName: "Numero De Egreso",
    width: 70,
  },
  {
    field: "files_price",
    headerName: "Precio",
    width: 120,
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
    width: 120,
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
    width: 190,
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
    width: 110,
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
  // {
    // field: "action",
    // headerName: "Acciones",
    // width: 90,
    // filterable: false,
    // renderCell: (cellValues: any) => ButtonModalEdit(cellValues),
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
  // },
];

export const columnsAllFiles: GridColDef[] = [
  {
    field: "files_registered",
    headerName: "Radicado",
    width: 180,
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
    headerName: "Codigo Causación",
    width: 70,
  },
  {
    field: "users_name",
    headerName: "Razon Social",
    width: 180,
  },
  {
    field: "files_cost_center",
    headerName: "Centro de Costo",
    width: 150,
  },
  {
    field: "files_code_treasury",
    headerName: "Numero De Egreso",
    width: 70,
  },
  {
    field: "files_price",
    headerName: "Precio",
    width: 120,
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
    width: 120,
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
];
export const columnsCenterCosts = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    filterable: false,
  },
  {
    field: "OP",
    headerName: "Operacion",
    width: 170,
  },
  {
    field: "OPERACION",
    headerName: "Operacion Numero",
    width: 150,
  },
  {
    field: "CD",
    headerName: "Cedi",
    width: 170,
  },
  {
    field: "CEDI",
    headerName: "Cedi Numero",
    width: 150,
  },
  {
    field: "DEP",
    headerName: "Dependencia",
    width: 170,
  },
  {
    field: "DEPENDENCIA",
    headerName: "Dependencia Numero",
    width: 150,
  },
];
export const columnsUsers: GridColDef[] = [
  {
    field: "users_name",
    headerName: "Nombre",
    width: 120,
  },
  {
    field: "users_lastname",
    headerName: "Apellidos",
    width: 150,
  },
  {
    field: "users_identification_type",
    headerName: "Tipo Documento",
    width: 150,
  },
  {
    field: "users_identification",
    headerName: "Numero Documento",
    width: 140,
  },
  {
    field: "roles",
    headerName: "Rol",
    width: 130,
  },
  {
    field: "users_phone",
    headerName: "Telefono",
    width: 120,
  },
  {
    field: "users_address",
    headerName: "Direccion",
    width: 140,
  },
  {
    field: "users_email",
    headerName: "Email",
    width: 210,
  },
  {
    field: "sedes_city",
    headerName: "Ciudad",
    width: 120,
  },
  {
    field: "users_status",
    headerName: "Estado Usuario",
    width: 130,
  },
];
export const columnsProvider: GridColDef[] = [
  {
    field: "users_name",
    headerName: "Razon Social",
    width: 170,
  },
  {
    field: "users_identification_type",
    headerName: "Tipo Documento",
    width: 130,
  },
  {
    field: "users_identification",
    headerName: "Numero Documento",
    width: 130,
  },
  {
    field: "users_phone",
    headerName: "Telefono",
    width: 120,
  },
  {
    field: "users_address",
    headerName: "Direccion",
    width: 140,
  },
  {
    field: "users_email",
    headerName: "Email",
    width: 190,
  },
  {
    field: "users_providers_paydays",
    headerName: "Dias limite pago",
    width: 130,
  },
  {
    field: "users_status",
    headerName: "Estado Proveedor",
    width: 130,
  },
];
export const columnsEmployee = [
  {
    field: "employees_photo_path",
    headerName: "Foto",
    width: 70,
    renderCell: (cellValues: any) => {
      const { employees_photo_path, employees_name,  } = cellValues.row;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={employees_name} src={employees_photo_path !== null ? employees_photo_path : avatarIcon} />
        </Stack>
      )
    },
  },
  {
    field: "employees_name",
    headerName: "Nombres",
    width: 120,
  },
  {
    field: "employees_lastname",
    headerName: "Apellidos",
    width: 120,
  },
  {
    field: "employees_identification_type",
    headerName: "Tipo Documento",
    width: 160,
  },
  {
    field: "employees_identification",
    headerName: "Numero Documento",
    width: 140,
  },
  {
    field: "employees_rh",
    headerName: "RH",
    width: 85,
  },
  {
    field: "employees_birthdate_date",
    headerName: "Edad",
    width: 85,
    valueFormatter : (params:any) => AgeToBirthday(params.value)
  },
  {
    field: "hiring_status",
    filterable: false,
    headerName: "Estado",
    renderCell: (cellValues: any) => {
      // const { hiring_status } = cellValues.row;
      const hiring_status = "ACTIVO"
      return (
        <Button variant="contained" color={hiring_status === "ACTIVO" ? "success" : "error"}>
          {hiring_status}
        </Button>
      )
    },
  },
  {
    field: "aut",
    headerName: "Auditoria",
    renderCell: (cellValues:any) => {
      const {} = cellValues.row;
      return (
        <Button
          variant="contained"
          color="warning"
          // disabled
          // disabled={valor en true para desabilitar}
        >
          Aprobar
        </Button>
      )
    },
  },
  {
    field: "out",
    headerName: "Retirar",
    renderCell: (cellValues: any) => {
      const {} = cellValues.row;
      return (
        <Button
          variant="contained"
          color="error"
          // onClick={funcion que saque modal y pida confirmacion, y la confirmacion debe convertir este botton en nuevo contrato}
        >
          Retiro
        </Button>
      )
    },
  },
];
