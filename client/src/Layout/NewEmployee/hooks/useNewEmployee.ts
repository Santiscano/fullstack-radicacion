import { FormEvent, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";
import axios from "axios";
import { getHeader, remove } from "../../../components/tools/SesionSettings";
import { useNavigate } from "react-router-dom";
import allRoutes from "../../../services/allRoutes";
import useContextProvider from "../../../Context/GeneralValuesContext";

function useNewEmployee(){
  //-------------------- var --------------------------------//
  const [progress, setProgress] = useState<number>(0/6) // value bar progress
  const [buffer, setBuffer] = useState<number>(1/6) //buffer progress
  const [formSection, setFormSection] = useState(0) // seccion del formulario a mostrar
  const [cedi, setCedi] = useState<any>();
  const { handleMessageSnackbar } = useContextProvider()
  //-------------------- methods ----------------------------//
  const navigate = useNavigate();
  const { changeTitleSection } = useDataGlobal();
  const changeToForm = (numberProgress:number, numberBuffer:number, numberSection:number ):void => {
    setProgress(numberProgress); setBuffer(numberBuffer); setFormSection(numberSection);
  };

  const handleCedi = (e: SelectChangeEvent) => {
    const cedi = e.target.value;
    console.log('cedi: ', cedi);
    setCedi(cedi);
  };


  //-------------------- handleSubmits ----------------------//
  const handleSubmitEmployee = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // create formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);

    // VALUE INPUTS
    const idroles = 11;
    const users_name = formData.get("name");
    const users_lastname = formData.get("lastname");
    const users_address = formData.get("address");
    const users_phone = formData.get("phone");
    const users_email = formData.get("email");
    const users_identification_type = formData.get("identification_type");
    const users_identification = formData.get("identification");

    const idsedes = cedi?.idsedes;

    // @ts-ignore
    console.log('formData: ', {idsedes, users_name, users_lastname, users_address, users_phone, users_email, idroles, users_identification_type, users_identification});
    // poner esto dentro del then
    console.log('paso', progress);

    axios.post(allRoutes.api.users.createUser,{
      idroles, idsedes, users_identification_type, users_identification, users_name, users_lastname, users_address, users_phone, users_email
    },getHeader())
      .then((res) =>{
        console.log('res',res);
        handleMessageSnackbar("success", res.data.message)
        changeToForm(1/6, 2/6, 1);
      })
      .catch((err) => {
        console.log('err: ', err);
        handleMessageSnackbar("error", err.response.data.message);
        // @ts-ignore
        const message = err.response.data.message
        if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS"){
          remove("accessToken");
          navigate("/login");
        }
      })

    // form.reset();
  };
  const handleSubmitPersonalInformation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(2/6, 3/6, 2);
  };
  const handleSubmitHiring = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(3/6, 4/6, 3);
  };
  const handleEmergencyContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(4/6, 5/6, 4)
  };
  const handleSocioDemographicProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(5/6, 1, 5)
  };
  const handleDocuments = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // crear formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    changeToForm(1,1,6);
  };
  const handleNewEmployee =(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // limpiar todo
    changeToForm(0,1/6,0)
  };

  useEffect(() => {
    changeTitleSection("CREAR EMPLEADO");
    return () => {
      changeTitleSection("");
    };
  },[]);

  return {
    // bar progress
    progress,
    buffer,
    formSection,
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
