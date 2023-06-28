import { Box, Tab, Tabs, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { FC } from "react";
// componentes generales
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
// hooks employee
import useNewEmployee from "./hooks/useNewEmployee";
// componets employee
import Debounced from "../../components/common/Debounced";

interface Props {}
const NewEmployee: FC<Props> = () => {
  const { showValue, handleShowValue, progress, buffer, handleNewEmployee,
    isCreatedEmployee, isPersonalInformation } = useNewEmployee();

  return (
    <div className="layout">
      <section className="layout-section">
        <div className="layout-left">
          <article className="filing">
            <div>
              <Debounced label="debounced" />
            </div>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  color="success"
                  variant="buffer"
                  value={progress * 100}
                  valueBuffer={buffer * 100}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="h5" color="green">
                  {(progress * 100).toFixed(2)}%
                </Typography>
              </Box>
            </Box>

            {/* tabs panel */}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={showValue}
                  onChange={handleShowValue}
                  aria-label="Crear Empleados"
                  variant="scrollable"
                >
                  <Tab label="Crear Empleado" {...a11yProps(0)} />
                  <Tab label="Información Personal" {...a11yProps(1)} disabled={!isCreatedEmployee} />
                  <Tab label="Contratación" {...a11yProps(2)} disabled={!isPersonalInformation}/>
                  <Tab label="Información Contacto de Emergencia" {...a11yProps(3)} />
                  <Tab label="Información Sociodemográfica" {...a11yProps(4)} />
                  <Tab label="Cargar Documentos" {...a11yProps(5)} />
                  <Tab label="Proceso Finalizado" {...a11yProps(6)} />
                </Tabs>
              </Box>

              <TabPanel value={showValue} index={0}>
              </TabPanel>

              <TabPanel value={showValue} index={1}>
              </TabPanel>

              <TabPanel value={showValue} index={2}>
              </TabPanel>

              <TabPanel value={showValue} index={3}>
              </TabPanel>

              <TabPanel value={showValue} index={4}>
              </TabPanel>

              <TabPanel value={showValue} index={5}>
              </TabPanel>
              <TabPanel value={showValue} index={6}>
                <>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{ fontWeight: "bold" }}
                    >
                      REGRESAR AL INICIO
                    </Typography>
                  </Box>
                  <form onSubmit={handleNewEmployee}>
                    <button className="button button--flex mt-6">
                      Crear nuevo Empleado
                    </button>
                  </form>
                </>
              </TabPanel>
            </Box>

            {/* forms */}
          </article>
        </div>
      </section>
    </div>
  );
};

export default NewEmployee;
