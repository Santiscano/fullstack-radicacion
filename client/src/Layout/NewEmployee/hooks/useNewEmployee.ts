import { FormEvent, useEffect, useState } from "react";
import { useDataGlobal } from "../../../redux/Redux-actions/useDataGlobal";

function useNewEmployee(){
  //-------------------- var --------------------------------//
  //-------------------- methods ----------------------------//
  const { changeTitleSection } = useDataGlobal();
  //-------------------- handleSubmits ----------------------//
  const handleSubmitEmployee = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // create formData
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);

    // VALUE INPUTS
    const users_name = formData.get("name");
    const users_lastname = formData.get("lastname");
    const users_address = formData.get("address");
    const users_phone = formData.get("phone");
    const users_email = formData.get("email");
    const roles = "EMPLEADO";
    const users_identification_type = formData.get("identification_type");
    const users_identification = formData.get("identification");

    console.log('users_identification_type: ', users_identification_type);

    // form.reset();
  };
  const handleSubmitPersonalInformation = () => {};

  useEffect(() => {
    changeTitleSection("CREAR EMPLEADO");
    return () => {
      changeTitleSection("");
    };
  },[]);

  return {
    // form submit
    handleSubmitEmployee,
    handleSubmitPersonalInformation,
  };
};

export default useNewEmployee;
