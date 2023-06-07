import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";
import axios from "axios";
import { getHeader, remove } from "../../../components/tools/SesionSettings";
import { useNavigate } from "react-router-dom";
import allRoutes from "../../../services/allRoutes";
import useContextProvider from "../../../Context/GeneralValuesContext";
import { useEmployee } from "../../../redux/Redux-actions/useEmployee";

function useNewEmployee(){
  //-------------------- var --------------------------------//
  const [showValue, setShowValue] = useState(0);
  const [progress, setProgress] = useState<number>(0/6) // value bar progress
  const [buffer, setBuffer] = useState<number>(1/6) //buffer progress
  const [cedi, setCedi] = useState<any>();
  const { handleMessageSnackbar } = useContextProvider()
  //-------------------- methods ----------------------------//
  const navigate = useNavigate();
  const { changeTitleSection } = useDataGlobal();
  const { addEmployee } = useEmployee()

  const changeToForm = (numberProgress:number, numberBuffer:number ):void => {
    setProgress(numberProgress); setBuffer(numberBuffer);
  };

  const handleCedi = (e: SelectChangeEvent) => {
    const cedi = e.target.value;
    console.log('cedi: ', cedi);
    setCedi(cedi);
  };

  const handleShowValue = (e: SyntheticEvent, newValue: number) => {
    setShowValue(newValue);
  };


  //-------------------- handleSubmits ----------------------//
  const handleSubmitEmployee = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // create formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);

    // VALUE INPUTS
    const idroles = 11;
    const sedes_name = formData.get("cedi")?.toString();
    const users_name = formData.get("name")?.toString();
    const users_lastname = formData.get("lastname")?.toString();
    const users_address = formData.get("address")?.toString();
    const users_phone = formData.get("phone")?.toString();
    const users_email = formData.get("email")?.toString();
    const users_identification_type = formData.get("identification_type")?.toString();
    const users_identification = formData.get("identification")?.toString();

    const idsedes = cedi?.idsedes;

    // establecer en redux
    // @ts-ignore
    addEmployee({ sedes_name, users_name, users_lastname, users_address, users_phone, users_email, users_identification, users_identification_type })

    // @ts-ignore
    console.log('formData: ', {idsedes, users_name, users_lastname, users_address, users_phone, users_email, idroles, users_identification_type, users_identification});
    // poner esto dentro del then
    console.log('paso', progress);

    // axios.post(allRoutes.api.users.createUser,{
    //   idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email
    // },getHeader())
    //   .then((res) =>{
    //     console.log('res',res);
    //     handleMessageSnackbar("success", res.data.message)
    //     changeToForm(1/6, 2/6);
    //   })
    //   .catch((err) => {
    //     console.log('err: ', err);
    //     handleMessageSnackbar("error", err.response.data.message);
    //     // @ts-ignore
    //     const message = err.response.data.message
    //     if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
    //       remove("accessToken");
    //       navigate("/login");
    //     }
    //   })

    // form.reset();
  };
  const handleSubmitPersonalInformation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(2/6, 3/6);
  };
  const handleSubmitHiring = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(3/6, 4/6);
  };
  const handleEmergencyContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(4/6, 5/6)
  };
  const handleSocioDemographicProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(5/6, 1)
  };
  const handleDocuments = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(1,1);
  };
  const handleNewEmployee =(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // limpiar todo
    changeToForm(0,1/6)
  };

  useEffect(() => {
    changeTitleSection("CREAR EMPLEADO");
    return () => {
      changeTitleSection("");
    };
  },[]);

  return {
    // tabs
    showValue,
    handleShowValue,
    // bar progress
    progress,
    buffer,
    // states & handles
    cedi,
    handleCedi,
    // form submit
    handleSubmitEmployee,
    handleSubmitPersonalInformation,
    handleSubmitHiring,
    handleEmergencyContact,
    handleSocioDemographicProfile,
    handleDocuments,
    handleNewEmployee,
  };
};

export default useNewEmployee;
