import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Debounced from "../../components/common/Debounced";
import { EmployeeProvider } from "../../Context/EmployeeContext";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import axios from "axios";
import allRoutes from "../../services/allRoutes";
import { getHeader } from "../../components/tools/SesionSettings";
import { columnsEmployee } from "../../interfaces/GridColumns";
import { Tooltip, IconButton, styled } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import NotFound from '../../assets/images/notFile.jpg';
import useContextProvider from "../../Context/GeneralValuesContext";
import { useEmployee } from "../../redux/Redux-actions/useEmployee";
import EditEmployee from "./components/Modal/EditEmployee";
import CreateEmployee from "./components/Modal/CreateEmployee";
import useNewEmployee from "./hooks/useNewEmployee";
const steps = [
  "Crear Empleado",
  "Información Personal",
  "Contratación",
  "Información Contacto de Emergencia",
  "Información Sociodemográfica",
  "Cargar Documentos",
  "Proceso Finalizado",
];
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
function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <img src={NotFound} width="250px" />
    </StyledGridOverlay>
  );
}

export default function NewEmployeeTest() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [rows, setRows] = useState<any>([]);
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  const { addEmployee, removeEmployee } = useEmployee();
  const { openModalCreateEmployee, handleCloseModal, handleOpenModal } = useNewEmployee();

  const handleGetEmployees = async () => {
    const res = await axios.get(allRoutes.sig.humanManagement.employees.getEmployees, getHeader());
    console.log('res: ', res);
    setRows(res.data.data);
  };

  const handleUpdateEmployee = () => {
    setRows([]);
    handleGetEmployees();
  };

  const handleView = (params: any) => {
    console.log('params: ', params);
    addEmployee(params.row);
    handleOpenModalAuth();
  };

  const handleNewEmployee = () => {
    console.log('remove redux employee')
    removeEmployee();
    handleOpenModal();
  };

  useEffect(() => {
    handleGetEmployees();
  },[])

  return (
    <EmployeeProvider>
      <div style={{width: "94%", margin:"auto"}}>
        <section
          style={{
            backgroundColor:"white",
            padding: 0,
            margin: 0,
            borderRadius: "25px",
            height: "85vh"
          }}>
          <div className="flex flex-row justify-between items-center py-3">
            <label className="block ml-4 text-base font-semibold dark:text-white">
              Empleados
            </label>
            <button className="button button--flex" onClick={handleNewEmployee}>
              Nuevo Empleado
            </button>
          </div>
          <Box sx={{ height: "83%", width: "97%", margin: "auto" }}>
            <DataGrid
              rows={rows}
              getRowId={(row) => row.idemployees}
              // @ts-ignore
              columns={columnsEmployee}
              onRowDoubleClick={handleView}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              components={{
                Toolbar: () => {
                  return (
                    <GridToolbarContainer>
                      <GridToolbarColumnsButton style={{ color: "#000", marginLeft: "17px" }} />
                      <GridToolbarFilterButton style={{ color: "#000", marginLeft: "17px" }} />
                      <GridToolbarExport style={{ color: "#000", marginLeft: "17px" }} />
                      <Tooltip title="Actualizar Tabla">
                        <IconButton onClick={handleUpdateEmployee}>
                          <RefreshIcon style={{color: "black"}}/>
                          <Typography
                            variant="subtitle2"
                            sx={{color:"#000", marginLeft: "12px"}}
                          >
                            Recargar
                          </Typography>
                        </IconButton>
                      </Tooltip>
                    </GridToolbarContainer>
                  )
                },
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              initialState={{
                pagination: { pageSize: 25 },
              }}
            />
          </Box>
        </section>
      </div>
      <CreateEmployee open={openModalCreateEmployee} close={handleCloseModal}/>
      {openModalAuth && (
        <EditEmployee/>
      )}
    </EmployeeProvider>
  );
}
