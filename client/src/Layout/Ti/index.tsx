import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useContextProvider from "../../Context/GeneralValuesContext";
import Button from "../../components/common/Button";
import InputSelectCity from "../../components/common/InputSelectCity";
import InputSelectOnlyValue from "../../components/common/InputSelectOnlyValue";
import LoadingMUI from "../../components/common/LoadingMUI";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
import { optionCediType } from "../../components/tools/OptionsValuesSelects";
import { get, roles } from "../../components/tools/SesionSettings";
import useSubmit from "./Hooks/useSubmit";
import "./TI.css";
import ProvidersTables from "./components/Tables/ProvidersTable";
import UsersTable from "./components/Tables/UsersTable";
import AlertDialogSlide from "./components/common/AlertDialogSlide";
import GetCediToBusinessUnit from "./components/common/GetCedisToBusinessUnit";
import SelectArea from "./components/common/SelectArea";

function TI() {
  const {
    showValue,
    handleChange,
    handleSubmitCreateCedi,
    listDepartment,
    department,
    handleDepartment,
    city,
    handleCity,
    listCitys,
    address,
    setAddress,
    cediName,
    setCediName,
    type,
    handleCediType,
    // create Area
    handleSubmitCreateArea,
    areaNumber,
    setAreaNumber,
    areaName,
    setAreaName,
    // crear sub Area
    handleSubmitCreateSubArea,
    subAreaNumber,
    setSubAreaNumber,
    subAreaName,
    setSubAreaName,
    connectionArea,
    handleConnectionArea,
    relationCedi,
    handleRelationCedi,
    //
    handleSubmitCreateCostCenter,
    costCenterNumber,
    setCostCenterNumber,
    costCenterName,
    setCostCenterName,
    //
    inputDeleted,
    setInputDeleted,
    handleDeleteFile,
    //view table
  } = useSubmit();
  const { cediConection } = useContextProvider();


  return (
    <div className="layout">
      <LoadingMUI />
      <section className="layout-section">
        <div className="layout-left">
          <article className="filing">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={showValue}
                  onChange={handleChange}
                  aria-label="Area TI"
                  variant="scrollable"
                >
                  <Tab label="Inicio" {...a11yProps(0)} />
                  <Tab label="Crear Cedi" {...a11yProps(1)} />
                  <Tab label="Crear Usuario" {...a11yProps(2)} />
                  <Tab label="Crear Proveedor" {...a11yProps(3)} />
                  <Tab label="Crear Centro de Costos" {...a11yProps(4)} />
                </Tabs>
              </Box>

              <TabPanel value={showValue} index={0}>
                <h3 className="font-bold text-2xl">Panel Administrativo</h3>
                {Number(get("idroles")) == roles.Administrador && (
                  <>
                    <h3 className="font-bold mt-6 text-xl">Eliminar Archivo</h3>
                    <h3 className="text-lg mt-2 text-red-500 font-bold">
                      * Tener presente que, una vez eliminado un archivo, se
                      perderá el rastro tanto del archivo como de la
                      trazabilidad, y estos no podrán ser recuperados en ningún
                      momento *
                    </h3>
                    <form>
                      <div className="md:flex md:flex-wrap mt-4">
                        <article className="md:w-1/2">
                          <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                            Numero De Radicado Del Archivo
                          </label>
                          <TextFieldOutlined
                            type={"text"}
                            label={"Numero Radicado"}
                            value={inputDeleted}
                            setValue={setInputDeleted}
                            required
                          />
                        </article>
                      </div>
                      <AlertDialogSlide
                        handleDeleteFile={handleDeleteFile}
                        inputDeleted={inputDeleted}
                      />
                    </form>
                  </>
                )}
              </TabPanel>
              {(Number(get("idroles")) == roles.AuditorTI ||
                Number(get("idroles")) == roles.Administrador) && (
                <TabPanel value={showValue} index={1}>
                  <form onSubmit={(event) => handleSubmitCreateCedi(event)}>
                    <div className="md:flex md:flex-wrap">
                      {listDepartment && (
                        <article className="md:w-1/2">
                          <InputSelectOnlyValue
                            type={"text"}
                            name="departament"
                            title="Departamento"
                            placeholder="Seleccione el Departamento"
                            required
                            value={department}
                            onChange={handleDepartment}
                            itemDefault="Selecciona el Departamento"
                            items={listDepartment}
                          />
                        </article>
                      )}
                      {listDepartment && (
                        <article className="md:w-1/2">
                          <InputSelectCity
                            type={"text"}
                            name="city"
                            title="Ciudad"
                            placeholder="Seleccione la Ciudad"
                            required
                            disabled={!department}
                            value={city}
                            onChange={handleCity}
                            itemDefault="Selecciona el Departamento"
                            items={listCitys}
                          />
                        </article>
                      )}
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Dirección
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Dirección Ubicacion"}
                          value={address}
                          setValue={setAddress}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombre Cedi
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Cedi"}
                          value={cediName}
                          setValue={setCediName}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <InputSelectOnlyValue
                          type={"text"}
                          title="Tipo de Cedi"
                          placeholder="Propio - Nacional"
                          required
                          value={type}
                          onChange={handleCediType}
                          itemDefault="selecciona el tipo de Cedi"
                          items={optionCediType}
                        />
                      </article>
                    </div>
                    <Button name="Crear Cedi" />
                  </form>
                </TabPanel>
              )}
              {(Number(get("idroles")) == roles.AuditorTI ||
                Number(get("idroles")) == roles.Administrador) && (
                <TabPanel value={showValue} index={2}>
                  <UsersTable/>
                </TabPanel>
              )}
              {(Number(get("idroles")) == roles.Contabilidad ||
                Number(get("idroles")) == roles.Administrador) && (
                <TabPanel value={showValue} index={3}>
                  <ProvidersTables/>
                </TabPanel>
              )}
              {(Number(get("idroles")) == roles.Contabilidad ||
                Number(get("idroles")) == roles.Administrador) && (
                <TabPanel value={showValue} index={4}>
                  <form onSubmit={(event) => handleSubmitCreateArea(event)}>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Numero Unidad De Negocio
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"Numero"}
                          value={areaNumber}
                          setValue={setAreaNumber}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombre Unidad De Negocio
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Nombre"}
                          value={areaName}
                          setValue={setAreaName}
                          required
                        />
                      </article>
                    </div>
                    <Button name="Crear Unidad negocio" />
                  </form>

                  <form onSubmit={(event) => handleSubmitCreateSubArea(event)}>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <SelectArea
                          valueArea={relationCedi}
                          onChangeArea={handleRelationCedi}
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Numero Cedi
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"Numero"}
                          value={subAreaNumber}
                          setValue={setSubAreaNumber}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombre Cedi
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Nombre"}
                          value={subAreaName}
                          setValue={setSubAreaName}
                          required
                        />
                      </article>
                    </div>

                    {/* <div className="md:flex md:flex-wrap">
                      <BusinessUnitCedi />
                    </div> */}
                    <Button name="Crear Cedi" />
                  </form>

                  <form
                    onSubmit={(event) => handleSubmitCreateCostCenter(event)}
                  >
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <SelectArea
                          valueArea={connectionArea}
                          onChangeArea={handleConnectionArea}
                        />
                      </article>
                      <article className="md:w-1/2">
                        {connectionArea && (
                          <GetCediToBusinessUnit
                            // @ts-ignore
                            BusinessUnit={connectionArea.id}
                          />
                        )}
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Numero Dependiencia
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"Numero"}
                          value={costCenterNumber}
                          setValue={setCostCenterNumber}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombre Dependencia
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Nombre"}
                          value={costCenterName}
                          setValue={setCostCenterName}
                          required
                        />
                      </article>
                    </div>

                    <div className="text-xl ml-4">
                      Centro de costos a crear:{" "}
                      <strong>
                        {/* @ts-ignore */}
                        {`${connectionArea && connectionArea.number}-${
                          cediConection && cediConection.number
                        }-${costCenterNumber}`}
                      </strong>
                    </div>
                    <Button name="Crear Dependencia" />
                  </form>
                </TabPanel>
              )}
            </Box>
          </article>
        </div>
      </section>
    </div>
  );
}

export default TI;
