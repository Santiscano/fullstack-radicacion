import { FC, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Tab, Tabs, Typography } from "@mui/material";
// componentes generales
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
import TestAutocomplete from "../../components/common/SearchDobleDepCity";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import InputOutlinedFormData from "../../components/common/InputOutlinedFormData";
import InputSelectDocTypeFormData from "../../components/common/InputSelectDocTypeFormData";
// hooks employee
import useNewEmployee from "./hooks/useNewEmployee";
// componets employee
import InputSelectCedi from "../../components/common/InputSelectCedi";
import CreateEmployee from "./components/TabsPanel/CreateEmployee";
import Debounced from "../../components/common/Debounced";

interface Props {}
const NewEmployee: FC = () => {
  const {
    showValue,
    handleShowValue,
    progress,
    buffer,
    cedi,
    handleCedi,
    handleSubmitEmployee,
    handleSubmitPersonalInformation,
    handleSubmitHiring,
    handleEmergencyContact,
    handleSocioDemographicProfile,
    handleDocuments,
    handleNewEmployee,
  } = useNewEmployee();

  return (
    <div className="layout">
      <section className="layout-section">
        <div className="layout-left">
          <article className="filing">
            <Debounced
              label="debounced"
            />

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
            <Box sx={{ width: "100%"}}>
              <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
                <Tabs
                  value={showValue}
                  onChange={handleShowValue}
                  aria-label="Crear Empleados"
                  variant="scrollable"
                >
                  <Tab label="Crear Empleado" {...a11yProps(0)}/>
                  <Tab label="Información Personal" {...a11yProps(1)}/>
                  <Tab label="Contratación" {...a11yProps(2)}/>
                  <Tab label="Información Contacto de Emergencia" {...a11yProps(3)}/>
                  <Tab label="Información Sociodemográfica" {...a11yProps(4)}/>
                  <Tab label="Proceso Finalizado" {...a11yProps(5)}/>
                </Tabs>
              </Box>

              <TabPanel value={showValue} index={0}>
                <>
                  <CreateEmployee/>
                  {/* <Box
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
                      CREAR USUARIO
                    </Typography>
                  </Box>
                  <form onSubmit={handleSubmitEmployee}>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Rol
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Empleado"}
                          value={"Empleado"}
                          required
                          disabled
                        />
                      </article>
                      <article className="md:w-1/2">
                        <InputSelectCedi
                          type={"text"}
                          title="Asignar Cedi"
                          placeholder="Cedi"
                          name="cedi"
                          required
                          value={cedi}
                          onChange={handleCedi}
                          itemDefault="selecciona una opcion"
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <InputSelectDocTypeFormData
                          type={"text"}
                          title={"Tipo de Documento"}
                          placeholder="C.C, NIT..."
                          name={"identification_type"}
                          required
                          itemDefault="Seleccione un Tipo"
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Numero de Documento
                        </label>
                        <InputOutlinedFormData
                          label={"Numero de Documento"}
                          name={"identification"}
                          type={"number"}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombre
                        </label>
                        <InputOutlinedFormData
                          label={"Nombre"}
                          name={"name"}
                          type={"text"}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Apellidos
                        </label>
                        <InputOutlinedFormData
                          label={"Apellidos"}
                          name={"lastname"}
                          type={"text"}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Dirección
                        </label>
                        <InputOutlinedFormData
                          label={"Dirección"}
                          name={"address"}
                          type={"text"}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Telefono
                        </label>
                        <InputOutlinedFormData
                          label={"Telefono"}
                          name={"phone"}
                          type={"number"}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Correo Electronico
                        </label>
                        <InputOutlinedFormData
                          label={"Correo Electronico"}
                          name={"email"}
                          type={"email"}
                          required
                        />
                      </article>
                    </div>

                    <button className="button button--flex mt-6">
                      Crear Empleado
                    </button>
                  </form> */}
                </>
              </TabPanel>

              <TabPanel value={showValue} index={1}>
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
                        INFORMACIÓN PERSONAL
                      </Typography>
                    </Box>
                    <form onSubmit={handleSubmitPersonalInformation}>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            information famili compensation fund
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            information pension
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            layoffs
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            eps
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            arl
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            medical emergency
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            arl emergency
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            rh
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            academi level
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            birthdate
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            gender
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            civil state
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            city
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            city
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            shirt_size
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            pant_size
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            shoe size
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            photo path
                          </label>
                        </article>
                      </div>
                      <button className="button button--flex mt-6">
                        Guardar Informacion Personal
                      </button>
                    </form>
                  </>
              </TabPanel>

              <TabPanel value={showValue} index={2}>
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
                      CONTRATACIÓN
                    </Typography>
                  </Box>
                  <form onSubmit={handleSubmitHiring}>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          type contratation name
                        </label>
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          position name
                        </label>
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          company name
                        </label>
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          company address
                        </label>
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          company phone
                        </label>
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          personal information vinculate date
                        </label>
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          hiring entry date
                        </label>
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          hiring departure date
                        </label>
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          hiring salary
                        </label>
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          hiring cost center
                        </label>
                      </article>
                    </div>
                    <button className="button button--flex mt-6">
                      Guardar Información Contratación
                    </button>
                  </form>
                </>
              </TabPanel>

              <TabPanel value={showValue} index={3}>
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
                        INFORMACIÓN CONTACTO DE EMERGENCIA
                      </Typography>
                    </Box>
                    <form onSubmit={handleEmergencyContact}>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            emergency contact name
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            emergency contact lastname
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            contact relationship
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            contact phone
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            cell phone
                          </label>
                        </article>
                      </div>
                      <button className="button button--flex mt-6">
                        Guardar Contacto Emergencia
                      </button>
                    </form>
                  </>
              </TabPanel>

              <TabPanel value={showValue} index={4}>
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
                        INFORMACIÓN SOCIODEMOGRAFICA
                      </Typography>
                    </Box>
                    <form onSubmit={handleSocioDemographicProfile}>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile place birth
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile transportation help
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile connectivity help
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile others contracts company
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile working modality
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile title academic training
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile home tenure
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile type transport
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile head family
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile number children
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile dependents
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile dependents disabilities
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile monthly family income
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile income enough
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile public services stratum
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile electric power
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile sewerage
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile equeduct
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile public natural gas network
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile garbage colletion
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile landline
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile computer home
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile internet home
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile alcohol consumption
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile smoke
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile former smoke
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile play sport
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile sport frequency
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile chronic disease
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile what crhonic disease
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile take medication
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile what medication take
                          </label>
                        </article>
                      </div>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile allergic
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            sociodemographic profile what allergic
                          </label>
                        </article>
                      </div>
                      <button className="button button--flex mt-6">
                        Guardar Información Sociodemografica
                      </button>
                    </form>
                  </>
              </TabPanel>

              <TabPanel value={showValue} index={5}>
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
                        CARGAR DOCUMENTOS
                      </Typography>
                    </Box>
                    <form onSubmit={handleDocuments}>
                      <div className="md:flex md:flex-wrap">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            documents creation date
                          </label>
                        </article>
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            documents path
                          </label>
                        </article>
                      </div>
                      <button className="button button--flex mt-6">
                        Guardar Documentos
                      </button>
                    </form>
                  </>
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
