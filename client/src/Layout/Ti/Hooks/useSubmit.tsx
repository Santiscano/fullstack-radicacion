import { SelectChangeEvent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { SyntheticEvent, useEffect, useState } from "react";
import { numberToStringWithTwoDigitNumber as numberToString } from "../../../Utilities/formatted.utility";
import { AllCedis } from "../../../interfaces/Cedis";
import { createCedi, getCedis } from "../../../services/Cedis.routes";
import {
  createArea,
  createCostCenter,
  createSubArea,
  getArea,
} from "../../../services/CenterCost.routes";
import { deleteFile } from "../../../services/Files.routes";
import { getRoles } from "../../../services/Roles.routes";
import { createProvider, createUser } from "../../../services/Users.routes";
import { getCitys } from "../../../services/getCitysColombia";
import useContextProvider from "./../../../Context/GeneralValuesContext";

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
  const [relationCedi, setRelationCedi] = useState("");
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
  // view tables
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [isCreateProvider, setIsCreateProvider] = useState(false);
  // --------------------------Context-------------------------------//
  const { setPreLoad, handleMessageSnackbar } = useContextProvider();
  // --------------------------handles-------------------------------//
  /**
   * traigo los departamentos, ciudades, cedis,
   * y almaceno en variables
   */
  const handleGetCitys = async () => {
    const departmentsResponse: any = await getCitys();
    setListDepartment(departmentsResponse?.Department);

    setListCitys(departmentsResponse?.DepartamentCity);
    setAllCitys(departmentsResponse?.DepartamentCity);

    const allCedis: AllCedis[] = await getCedis();
    // console.log("allCedis: ", allCedis);
    setOptionsCedisIdName(allCedis);

    // crear usuarios
    const allRoles = await getRoles();
    console.log("allRoles: ", allRoles);
    const optionsCreateUser = allRoles.filter(
      (rol: { roles: string }) =>
        rol.roles !== "ADMINISTRADOR" && rol.roles !== "PROVEEDOR"
    );
    console.log("optionsCreateUser", optionsCreateUser);
    setOptionsRol(optionsCreateUser);

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
  const handleRelationCedi = (e: SelectChangeEvent) =>
    setRelationCedi(e.target.value);

  const handleRol = (e: SelectChangeEvent) => {
    setAssignRole(e.target.value);
  };
  const handleCedi = (e: SelectChangeEvent) => {
    const cedi = e.target.value;
    // @ts-ignore
    setCedi(e.target.value);
  };
  const handleCedity = (e: SelectChangeEvent) => {
    setIdentificationType(e.target.value);
  };
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
        handleMessageSnackbar("success", "Cedi Creada Con Exito");
        setPreLoad(false);
      }
      if (res?.status !== 200) {
        handleMessageSnackbar("error", "Cedi No Fue Creada Ocurrio Un Error");
        setPreLoad(false);
      }
    } catch (error) {
      handleMessageSnackbar("error", "Ocurrio Un Error Intenta De Nuevo");
    }
  };
  const handleSubmitCreateUser = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const res = await createUser(
        import.meta.env.VITE_API_KEY,
        assignRole,
        cedi.idsedes,
        identificationType,
        identificationNumber,
        firstName,
        lastName,
        address,
        phone,
        email,
        password
      );
      console.log("res: ", res);
      if (res?.status == 200 && res.statusText == "OK") {
        handleMessageSnackbar(
          "success",
          `Usuario ${firstName} Creado Con Exito`
        );
        setPreLoad(false);
        // dates
        setAssignRole([]);
        setCedi([]);
        setIdentificationType("");
        setIdentificationNumber("");
        setFirstname("");
        setLastName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setPassword("");
        setIsCreateUser(false);
      }
      if (res?.status !== 200) {
        handleMessageSnackbar(
          "error",
          `Usuario ${firstName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creado Ocurrio Un Error"
          }`
        );
        setPreLoad(false);
      }
    } catch (error) {
      // console.log("error: ", error);
      handleMessageSnackbar("error", "Ocurrio Un Error Intenta De Nuevo");
    } finally {
      setReset(false);
    }
  };
  const handleSubmitCreateProvider = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      console.log("valor rol:", assignRole);
      const res = await createProvider(
        import.meta.env.VITE_API_KEY,
        assignRole,
        cedi.idsedes,
        identificationType,
        identificationNumber,
        firstName,
        address,
        phone,
        email,
        limitDaysPayment,
        documentationUpdate
      );
      console.log("res: ", res);
      if (res?.status == 200 && res.statusText == "OK") {
        handleMessageSnackbar(
          "success",
          `Proveedor ${firstName} Creado Con Exito`
        );
        setPreLoad(false);
        setReset(true);
        // values
        setAssignRole([]);
        setCedi([]);
        setIdentificationType("");
        setIdentificationNumber("");
        setFirstname("");
        setLastName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setLimitDaysPayment(NaN);
        // @ts-ignore
        setDocumentationUpdate(new Date());
        setIsCreateProvider(false);
      }
      if (res?.status !== 200) {
        handleMessageSnackbar(
          "error",
          `Usuario ${firstName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setPreLoad(false);
      }
    } catch (error) {
      // console.log("error: ", error);
      handleMessageSnackbar("error", "Ocurrio Un Error Intenta De Nuevo");
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
        handleMessageSnackbar("success", `Area ${areaName} Creada Con Exito`);
        setPreLoad(false);
        setAreaNumber(NaN);
        setAreaName("");
        getArea();
      }
      if (res?.status !== 200) {
        handleMessageSnackbar(
          "error",
          `Area ${areaName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setPreLoad(false);
      }
    } catch (error) {
      // console.log("error: ", error);
      handleMessageSnackbar(
        "error",
        "Ocurrio Un Error En El Servidor Intenta De Nuevo"
      );
    } finally {
      setPreLoad(false);
    }
  };
  const handleSubmitCreateSubArea = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const res = await createSubArea(
        // @ts-ignore
        relationCedi.id,
        subAreaNumber,
        subAreaName
      );
      console.log("res: ", res);
      if (res?.status == 200) {
        handleMessageSnackbar(
          "success",
          `Sub-Area: ${subAreaName} Conectada al Area con ID ${connectionArea} Exitoso`
        );
        setPreLoad(false);
        setConnectionArea("");
        setSubAreaNumber("");
        setSubAreaName("");
      }
      if (res?.status !== 200) {
        handleMessageSnackbar(
          "error",
          `Sub-Area ${subAreaName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creada Ocurrio Un Error"
          }`
        );
        setPreLoad(false);
      }
    } catch (error) {
      handleMessageSnackbar(
        "error",
        "Ocurrio Un Error En El Servidor Intenta De Nuevo"
      );
    } finally {
      setPreLoad(false);
    }
  };
  const handleSubmitCreateCostCenter = async (e: any) => {
    try {
      setPreLoad(true);
      e.preventDefault();
      const res = await createCostCenter(
        // @ts-ignore
        cediConection.id,
        costCenterNumber,
        costCenterName
      );
      console.log("res: ", res);
      if (res?.status == 200) {
        handleMessageSnackbar(
          "success",
          `Centro De Costos: ${costCenterName} Conectado al SubArea con ID ${connectionSubArea} Exitoso`
        );
        setPreLoad(false);
        setConnectionSubArea("");
        setCostCenterNumber("");
        setCostCenterName("");
      }
      if (res?.status !== 200) {
        handleMessageSnackbar(
          "error",
          `Centro De Costos ${costCenterName}: ${
            res?.data.message
              ? res?.data.message
              : "No Fue Creado Ocurrio Un Error"
          }`
        );
        setPreLoad(false);
      }
    } catch (error) {
      // console.log("error: ", error);
      handleMessageSnackbar(
        "error",
        "Ocurrio Un Error En El Servidor Intenta De Nuevo"
      );
    } finally {
      setPreLoad(false);
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
        handleMessageSnackbar(
          "success",
          `Archivo ${inputDeleted}, Eliminado Con Exito`
        );
        setPreLoad(false);
      }
      if (res?.status !== 200) {
        handleMessageSnackbar(
          "error",
          `No se pudo Eliminar archivo ${inputDeleted}, Ocurrio Un Error`
        );
        setPreLoad(false);
        handleCloseDialogDelete();
      }
    } catch (error) {
      // console.log("error: ", error);
      handleMessageSnackbar("error", "Ocurrio Un Error Intenta De Nuevo");
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
    relationCedi,
    handleRelationCedi,
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
    // view tables
    isCreateUser,
    setIsCreateUser,
    isCreateProvider,
    setIsCreateProvider,
  };
}

export default useSubmit;
