import { useState } from "react";
import TestAutocomplete from "../../components/common/SearchDobleDepCity";
import useNewEmployee from "./hooks/useNewEmployee";
import InputOutlinedFormData from "../../components/common/InputOutlinedFormData";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import InputSelectDocTypeFormData from "../../components/common/InputSelectDocTypeFormData";
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography } from "@mui/material";
import CreateEmployee from "./components/Forms/CreateEmployee";

function NewEmployee() {
  const { progress, buffer, formSection, handleSubmitEmployee, handleSubmitPersonalInformation, handleSubmitHiring, handleEmergencyContact, handleSocioDemographicProfile, handleDocuments, handleNewEmployee } = useNewEmployee();

  return (
    <div className="layout">
      <section className="layout-section">
        <div className="layout-left">
          <article className="filing">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  color="success"
                  variant="buffer"
                  value={progress*100}
                  valueBuffer={buffer*100}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="h5" color="green" >{(progress*100).toFixed(2)}%</Typography>
              </Box>
            </Box>
            {formSection == 0 &&
              (<>
                <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                  <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>CREAR USUARIO</Typography>
                </Box>
                <form onSubmit={handleSubmitEmployee}>
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
                    <article className="md:w-1/2">
                      <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                        Tipo de Usuario
                      </label>
                      <TextFieldOutlined
                        type={"text"}
                        label={"Empleado"}
                        value={"Empleado"}
                        required
                        disabled
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
                  <button
                    className="button button--flex mt-6"
                    // type="submit"
                  >
                    de 0 a 16%
                  </button>
                </form>
              </>
              )}
              {formSection == 1 &&
                (<>
                  <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                    <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>INFORMACIÓN PERSONAL</Typography>
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
                  <button className="button button--flex mt-6">de 16% a 33%</button>
                </form>
                </>)}
              {formSection == 2 &&
              (<>
                <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                  <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>CONTRATACIÓN</Typography>
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
                  <button className="button button--flex mt-6">de 33% a 49%</button>
                </form>
              </>
              )}
              {formSection == 3 &&
              (<>
                <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                  <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>INFORMACIÓN CONTACTO DE EMERGENCIA</Typography>
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
                  <button className="button button--flex mt-6">de 49% a 66%</button>
                </form>
              </>
              )}
              {formSection == 4 &&
              (<>
                <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                  <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>INFORMACIÓN SOCIODEMOGRAFICA</Typography>
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
                  <button className="button button--flex mt-6">de 66% a 83%</button>
                </form>
              </>
              )}
              {formSection == 5 &&
              (<>
                <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                  <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>CARGAR DOCUMENTOS</Typography>
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
                  <button className="button button--flex mt-6">de 83% a 100%</button>
                </form>
              </>
              )}
              {formSection == 6 &&
              (<>
                <Box sx={{ width:"100%", display:"flex", justifyContent:"center"}}>
                  <Typography variant="h4" component="h4" sx={{ fontWeight:"bold"}}>REGRESAR AL INICIO</Typography>
                </Box>
                <form onSubmit={handleNewEmployee}><button className="button button--flex mt-6">Crear nuevo Empleado</button></form>
              </>
              )}
          </article>
        </div>
      </section>
    </div>
  );
}

export default NewEmployee;
