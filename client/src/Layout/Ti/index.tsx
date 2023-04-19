import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "../../components/common/Button";
import InputSelectCedi from "../../components/common/InputSelectCedi";
import InputSelectCity from "../../components/common/InputSelectCity";
import InputSelectDocType from "../../components/common/InputSelectDocType";
import InputSelectOnlyValue from "../../components/common/InputSelectOnlyValue";
import InputSelectRol from "../../components/common/InputSelectRol";
import LoadingMUI from "../../components/common/LoadingMUI";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
import { optionCediType } from "../../components/tools/OptionsValuesSelects";
import useSubmit from "./Hooks/useSubmit";
import "./TI.css";
import SelectArea from "./components/common/SelectArea";
import AlertDialogSlide from "./components/common/AlertDialogSlide";
import { roles, get } from "../../components/tools/SesionSettings";

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
    openSnackbar,
    severitySnackbar,
    messageSnackbar,
    handleSubmitCreateUser,
    handleSubmitCreateProvider,
    assignRole,
    handleRol,
    reset,
    optionsRol,
    onlyRolProvider,
    cedi,
    handleCedi,
    optionsCedisIdName,
    identificationType,
    handleCedity,
    identificationNumber,
    setIdentificationNumber,
    firstName,
    setFirstname,
    lastName,
    setLastName,
    addressUser,
    setAddressUser,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    limitDaysPayment,
    setLimitDaysPayment,
    documentationUpdate,
    setDocumentationUpdate,
    // create Area
    handleSubmitCreateArea,
    areaNumber,
    setAreaNumber,
    areaName,
    setAreaName,
    setMessageSnackbar,
    // crear sub Area
    handleSubmitCreateSubArea,
    subAreaNumber,
    setSubAreaNumber,
    subAreaName,
    setSubAreaName,
    connectionArea,
    handleConnectionArea,
    //
    handleSubmitCreateCostCenter,
    costCenterNumber,
    setCostCenterNumber,
    costCenterName,
    setCostCenterName,
    connectionSubArea,
    handleConnectionSubArea,
    //
    inputDeleted,
    setInputDeleted,
    handleDeleteFile,
  } = useSubmit();

  return (
    <div className="layout">
      <LoadingMUI />
      <section className="layout-section">
        <div className="layout-left">
          <div className="container__createFiling">
            <h3 className="createFiling">
              Administracion & Gestion de Plataforma Web
            </h3>
          </div>
          <article className="filing-ti">
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
                      *Tenga presente que una vez eliminado un archivo, tanto la
                      trazabilidad como el archivo no podran ser recuperados*
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
                  <form onSubmit={(event) => handleSubmitCreateUser(event)}>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <InputSelectRol
                          type={"text"}
                          title="Asignar Rol"
                          placeholder="Rol"
                          name="role"
                          required
                          value={assignRole}
                          onChange={handleRol}
                          itemDefault="selecciona una opcion"
                          items={optionsRol}
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
                        <InputSelectDocType
                          type={"text"}
                          title="Tipo de Documento"
                          placeholder="C.C, NIT..."
                          name="type"
                          required
                          value={identificationType}
                          onChange={handleCedity}
                          itemDefault="selecciona un tipo"
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Numero de documento
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"Numero"}
                          value={identificationNumber}
                          setValue={setIdentificationNumber}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombres
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Nombre"}
                          value={firstName}
                          setValue={setFirstname}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Apellidos
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Apellidos"}
                          value={lastName}
                          setValue={setLastName}
                          required
                        />
                      </article>
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
                          Teléfono
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"numero"}
                          value={phone}
                          setValue={setPhone}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Correo Electronico
                        </label>
                        <TextFieldOutlined
                          type={"email"}
                          label={"Email"}
                          value={email}
                          setValue={setEmail}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Contraseña
                        </label>
                        <TextFieldOutlined
                          type={"password"}
                          label={"contraseña"}
                          value={password}
                          setValue={setPassword}
                          required
                        />
                      </article>
                    </div>
                    <Button name="Crear Usuario" />
                  </form>
                </TabPanel>
              )}
              {(Number(get("idroles")) == roles.Contabilidad ||
                Number(get("idroles")) == roles.Administrador) && (
                <TabPanel value={showValue} index={3}>
                  <form onSubmit={(event) => handleSubmitCreateProvider(event)}>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <InputSelectRol
                          type={"text"}
                          title="Asignar Rol"
                          placeholder="Rol"
                          name="role"
                          required
                          value={assignRole}
                          onChange={handleRol}
                          itemDefault="selecciona una opcion"
                          items={onlyRolProvider}
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
                        <InputSelectDocType
                          type={"text"}
                          title="Tipo de Documento"
                          placeholder="C.C, NIT..."
                          name="type"
                          required
                          value={identificationType}
                          onChange={handleCedity}
                          itemDefault="selecciona un tipo"
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Numero de documento
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"Numero"}
                          value={identificationNumber}
                          setValue={setIdentificationNumber}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Nombres
                        </label>
                        <TextFieldOutlined
                          type={"text"}
                          label={"Nombre"}
                          value={firstName}
                          setValue={setFirstname}
                          required
                        />
                      </article>
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
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Teléfono
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"numero"}
                          value={phone}
                          setValue={setPhone}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Correo Electronico
                        </label>
                        <TextFieldOutlined
                          type={"email"}
                          label={"Email"}
                          value={email}
                          setValue={setEmail}
                          required
                        />
                      </article>
                    </div>
                    <div className="md:flex md:flex-wrap">
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Dias de Limite de Pago
                        </label>
                        <TextFieldOutlined
                          type={"number"}
                          label={"numero de Días"}
                          value={limitDaysPayment}
                          setValue={setLimitDaysPayment}
                          required
                        />
                      </article>
                      <article className="md:w-1/2">
                        <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                          Fecha de Actualización
                        </label>
                        <TextFieldOutlined
                          type={"date"}
                          label={""}
                          value={documentationUpdate}
                          setValue={setDocumentationUpdate}
                          required
                        />
                      </article>
                    </div>
                    <Button name="Crear Usuario" />
                  </form>
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
                    <Button name="Crear Area" />
                  </form>

                  <form onSubmit={(event) => handleSubmitCreateSubArea(event)}>
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
                    <div className="md:flex md:flex-wrap">
                      <SelectArea
                        isArea
                        valueArea={connectionArea}
                        onChangeArea={handleConnectionArea}
                        valueSubArea={connectionSubArea}
                        onChangeSubArea={handleConnectionSubArea}
                        update={setMessageSnackbar}
                      />
                    </div>
                    <Button name="Crear SubArea" />
                  </form>

                  <form
                    onSubmit={(event) => handleSubmitCreateCostCenter(event)}
                  >
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
                    <div className="md:flex md:flex-wrap">
                      <SelectArea
                        isSubArea
                        valueSubArea={connectionSubArea}
                        onChangeSubArea={handleConnectionSubArea}
                      />
                    </div>
                    <Button name="Crear Centro De Costos" />
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
