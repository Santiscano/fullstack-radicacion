import { SelectChangeEvent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { AllCedis } from "../../../interfaces/Cedis";
import { createCedi, getCedis } from "../../../services/Cedis.routes";
import { createProvider, createUser } from "../../../services/Users.routes";
import { getCitys } from "../../../services/getCitysColombia";
import { getRoles } from "../../../services/Roles.routes";
import { GeneralValuesContext } from "./../../../Context/GeneralValuesContext";
import {
  createArea,
  createCostCenter,
  createSubArea,
  getArea,
} from "../../../services/CenterCost.routes";
import { numberToStringWithTwoDigitNumber as numberToString } from "../../../Utilities/formatted.utility";
import { deleteFile } from "../../../services/Files.routes";

function useSubmit() {
  // --------------------------Variable-------------------------------//
  // view options
  const [showValue, setShowValue] = useState(0);
  // Delete File
  const [inputDeleted, setInputDeleted] = useState("");
  // create rol
  const [rolName, setRolName] = useState("");
  const [rolDescription, setRolDescription] = useState("");
  // create cedi
  const [department, setDepartment] = useState("");
  const [listDepartment, setListDepartment] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [listCitys, setListCitys] = useState<any>("");
  const [allCitys, setAllCitys] = useState<any>("");
  const [address, setAddress] = useState("");
  const [cediName, setCediName] = useState("");
  const [type, setType] = useState("");
  // create user
  const [assignRole, setAssignRole] = useState<any>();
  const [optionsRol, setOptionsRol] = useState<any>([]);
  const [onlyRolProvider, setOnlyRolProvider] = useState<any>([]);
  const [cedi, setCedi] = useState<any>();
  const [optionsCedisIdName, setOptionsCedisIdName] = useState<any>([]);
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressUser, setAddressUser] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [limitDaysPayment, setLimitDaysPayment] = useState<number>();
  const [documentationUpdate, setDocumentationUpdate] = useState<Date>();
  // create Area Cost
  const [areaNumber, setAreaNumber] = useState<number>(NaN);
  const [areaName, setAreaName] = useState("");
  // create subArea
  const [subAreaNumber, setSubAreaNumber] = useState("");
  const [subAreaName, setSubAreaName] = useState("");
  const [connectionArea, setConnectionArea] = useState("");
  // create Center Cost
  const [costCenterNumber, setCostCenterNumber] = useState("");
  const [costCenterName, setCostCenterName] = useState("");
  const [connectionSubArea, setConnectionSubArea] = useState("");
  // success
  const [modalSuccess, setModalSuccess] = useState(false); // status 200 filePath para mostrar hijo modal
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [severitySnackbar, setSeveritySnackbar] = useState("");
  // reset forms
  const [reset, setReset] = useState(false);
  // --------------------------Context-------------------------------//
  const { setPreLoad } = useContext(GeneralValuesContext);
  // --------------------------handles-------------------------------//
  /**
   * traigo los departamentos, ciudades, cedis,
   * y almaceno en variables
   */
  const handleGetCitys = async () => {
    const departmentsResponse: any = await getCitys();
    // console.log("departmentsResponse: ", departmentsResponse);
    setListDepartment(departmentsResponse?.Department);

    setListCitys(departmentsResponse?.DepartamentCity);
    setAllCitys(departmentsResponse?.DepartamentCity);

    const allCedis: AllCedis[] = await getCedis();
    // console.log("allCedis: ", allCedis);
    setOptionsCedisIdName(allCedis);

    // crear usuarios
    const allRoles = await getRoles();
    // console.log("allRoles: ", allRoles);
    const createUser = allRoles.filter(
      (rol: { roles: string }) =>
        rol.roles !== "ADMINISTRADOR" && rol.roles !== "PROVEEDOR"
    );
    setOptionsRol(createUser);

    // crear proveedores
    const createProvider = allRoles.filter(
      (rol: { roles: string }) => rol.roles === "PROVEEDOR"
    );
    setOnlyRolProvider(createProvider);
  };
  /**
   * metodo para pasar entre crear rol, cedi.... etc
   * @param e
   * @param newValue nuevo lugar donde pasa
   */
  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setShowValue(newValue);
  };
  const handleDepartment = (e: SelectChangeEvent) => {
    setCity("");
    setDepartment(e.target.value);

    // @ts-ignore
    const filterCity = allCitys.filter(
      (location: any) => location.departamento === e.target.value
    );
    // @ts-ignore
    setListCitys(filterCity);
  };
  const handleCity = (e: SelectChangeEvent) => setCity(e.target.value);
  const handleCediType = (e: SelectChangeEvent) => setType(e.target.value);
  const handleConnectionArea = (e: SelectChangeEvent) =>
    setConnectionArea(e.target.value);
  const handleConnectionSubArea = (e: SelectChangeEvent) =>
    setConnectionSubArea(e.target.value);

  const handleRol = (e: SelectChangeEvent) => {
    setAssignRole(e.target.value);
    // console.log(e.target.value);
  };
  const handleCedi = (e: SelectChangeEvent) => {
    const cedi = e.target.value;
    // console.log("cedi", e.target.value);
    // @ts-ignore
    setCedi(e.target.value);
  };
  const handleCedity = (e: SelectChangeEvent) => {
    setIdentificationType(e.target.value);
  };
  const handleCloseSnackbar = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  function TransitionLeft(props: TransitionProps) {
    // @ts-ignore
    return <Slide {...props} direction="left" />;
  }
  const handleCloseModalChild = () => setModalSuccess(false);

  // --------------------------handles Submit-------------------------------//
  /**
   * funcion para crear cedis
   * @param e usado para preventDefault
   */
  const handleSubmitCreateCedi = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const res = await createCedi(
        city,
        "COLOMBIA",
        address,
        cediName,
        type,
        department
      );
      // console.log("res: ", res);
      setCity("");
      setAddress("");
      setCediName("");
      setType("");
      if (res?.status == 200) {
        setMessageSnackbar("Cedi Creada Con Exito");
        setSeveritySnackbar("success");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
      if (res?.status !== 200) {
        setMessageSnackbar("Cedi No Fue Creada Ocurrio Un Error");
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
    }
  };
  const handleSubmitCreateUser = async (e: any) => {
    try {
      // console.log(addressUser);
      setPreLoad(true);
      e.preventDefault();
      const res = await createUser(
        import.meta.env.VITE_API_KEY,
        assignRole,
        cedi,
        identificationType,
        identificationNumber,
        firstName,
        lastName,
        address,
        phone,
        email,
        password
      );
      // console.log("res: ", res);
      if (res?.status == 200 && res.statusText == "OK") {
        setMessageSnackbar(`Usuario ${firstName} Creado Con Exito`);
        setSeveritySnackbar("success");
        setPreLoad(false);
        setOpenSnackbar(true);
        setAssignRole("");
        setReset(true);
        setCedi("");
        setIdentificationType("");
        setIdentificationNumber("");
        setFirstname("");
        setLastName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setPassword("");
      }
      if (res?.status !== 200) {
        setMessageSnackbar(
          `Usuario ${firstName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
    } finally {
      setReset(false);
    }
  };
  const handleSubmitCreateProvider = async (e: any) => {
    try {
      // console.log(addressUser);
      setPreLoad(true);
      e.preventDefault();
      // console.log(cedi);
      const res = await createProvider(
        assignRole,
        cedi,
        identificationType,
        identificationNumber,
        firstName,
        address,
        phone,
        email,
        limitDaysPayment,
        documentationUpdate
      );
      // console.log("res: ", res);
      if (res?.status == 200 && res.statusText == "OK") {
        setMessageSnackbar(`Proveedor ${firstName} Creado Con Exito`);
        setSeveritySnackbar("success");
        setPreLoad(false);
        setOpenSnackbar(true);
        setAssignRole("");
        setReset(true);
        setCedi("");
        setIdentificationType("");
        setIdentificationNumber("");
        setFirstname("");
        setLastName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setPassword("");
      }
      if (res?.status !== 200) {
        setMessageSnackbar(
          `Usuario ${firstName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
    } finally {
      setReset(false);
    }
  };
  const handleSubmitCreateArea = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const res = await createArea(numberToString(areaNumber), areaName);
      // console.log("res: ", res);
      if (res?.status == 200) {
        setMessageSnackbar(`Area ${areaName} Creada Con Exito`);
        setSeveritySnackbar("success");
        setPreLoad(false);
        setOpenSnackbar(true);
        setAreaNumber(NaN);
        setAreaName("");
        getArea();
      }
      if (res?.status !== 200) {
        setMessageSnackbar(
          `Area ${areaName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error En El Servidor Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
    } finally {
      setPreLoad(false);
      setOpenSnackbar(true);
    }
  };
  const handleSubmitCreateSubArea = async (e: any) => {
    try {
      // console.log("values: ", subAreaNumber, subAreaName, connectionArea);
      setPreLoad(true);
      e.preventDefault();
      const res = await createSubArea(
        connectionArea,
        subAreaNumber,
        subAreaName
      );
      // console.log("res: ", res);
      if (res?.status == 200) {
        setMessageSnackbar(
          `Sub-Area: ${subAreaName} Conectada al Area con ID ${connectionArea} Exitoso`
        );
        setSeveritySnackbar("success");
        setPreLoad(false);
        setOpenSnackbar(true);
        setConnectionArea("");
        setSubAreaNumber("");
        setSubAreaName("");
      }
      if (res?.status !== 200) {
        setMessageSnackbar(
          `Sub-Area ${subAreaName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error En El Servidor Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
    } finally {
      setPreLoad(false);
      setOpenSnackbar(true);
    }
  };
  const handleSubmitCreateCostCenter = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const res = await createCostCenter(
        connectionSubArea,
        costCenterNumber,
        costCenterName
      );
      // console.log("res: ", res);
      if (res?.status == 200) {
        setMessageSnackbar(
          `Centro De Costos: ${costCenterName} Conectado al SubArea con ID ${connectionSubArea} Exitoso`
        );
        setSeveritySnackbar("success");
        setPreLoad(false);
        setOpenSnackbar(true);
        setConnectionSubArea("");
        setCostCenterNumber("");
        setCostCenterName("");
      }
      if (res?.status !== 200) {
        setMessageSnackbar(
          `Centro De Costos ${costCenterName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creado Ocurrio Un Error"
          }`
        );
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error En El Servidor Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
    } finally {
      setPreLoad(false);
      setOpenSnackbar(true);
    }
  };
  const handleDeleteFile = async (
    e: any,
    valueDelete: any,
    handleCloseDialogDelete: any
  ) => {
    // console.log("funciono a la perfeccion");
    try {
      handleCloseDialogDelete();
      setPreLoad(true);
      e.preventDefault();
      const res = await deleteFile(valueDelete);
      // console.log("res: ", res);
      if (res?.status == 200) {
        setInputDeleted("");
        setMessageSnackbar(`Archivo ${inputDeleted}, Eliminado Con Exito`);
        setSeveritySnackbar("success");
        // handleCloseDialogDelete();
        setPreLoad(false);
        setOpenSnackbar(true);
      }
      if (res?.status !== 200) {
        setMessageSnackbar(
          `No se pudo Eliminar archivo ${inputDeleted}, Ocurrio Un Error`
        );
        setSeveritySnackbar("error");
        setPreLoad(false);
        setOpenSnackbar(true);
        handleCloseDialogDelete();
      }
    } catch (error) {
      // console.log("error: ", error);
      setMessageSnackbar("Ocurrio Un Error Intenta De Nuevo");
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
      handleCloseDialogDelete();
    } finally {
      setPreLoad(false);
    }
  };

  // --------------------------Effects-------------------------------//
  useEffect(() => {
    handleGetCitys();
  }, []);
  useEffect(() => {
    handleGetCitys();
  }, [setMessageSnackbar]);

  return {
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
    handleCloseSnackbar,
    TransitionLeft,
    severitySnackbar,
    messageSnackbar,
    handleSubmitCreateUser,
    handleSubmitCreateProvider,
    assignRole,
    handleRol,
    reset,
    optionsRol,
    onlyRolProvider,
    // create user
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
    inputDeleted,
    setInputDeleted,
    handleDeleteFile,
  };
}

export default useSubmit;
