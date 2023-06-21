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
  const { handleOpenModalAuth } = useContextProvider();
  const { addEmployee } = useEmployee();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleUpdateEmployee = () => {};

  const handleGetEmployees = async () => {
    const res = await axios.get(allRoutes.sig.humanManagement.getEmployees, getHeader());
    setRows(res.data.data);
  };

  const handleView = (params: any) => {
    console.log('params: ', params);
    addEmployee(params.row);
    handleOpenModalAuth();
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
            <button className="button button--flex" >
              Nuevo Usuario
            </button>
          </div>
          <Box sx={{ height: "90%", width: "100%" }}>
            <DataGrid
              rows={rows}
              getRowId={(row) => row.idusers}
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
      {/* <article className="filing">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </article> */}
    </EmployeeProvider>
  );
}
