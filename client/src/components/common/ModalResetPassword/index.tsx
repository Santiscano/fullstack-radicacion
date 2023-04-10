import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "animate.css";

import { changePassword } from "../../../services/Firebase.routes";
import { GeneralValuesContext } from "./../../../Context/GeneralValuesContext";
import LoadingMUI from "../LoadingMUI";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  open: boolean;
  close: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: { xs: "62vh", md: "45vh" },
  overflow: "scroll",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  zIndex: "1",
};

type email = {
  email: string,
};

export default function ModalResetPassword({
  open,
  close,
}:Props) {
  const [responseReset, setResponseReset] = useState('');
  const [responseError, setResponseError] = useState('');

  const { setPreLoad } = useContext(GeneralValuesContext);

  const reqExp = {
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  }

  const {register, handleSubmit, watch, reset,formState: { errors }} = useForm<email>();

  const handleSubmitResetPassword: SubmitHandler<email> = async (data) => {
    try{
      setPreLoad(true);
      const response = await changePassword(data.email);
      if (response?.data.message === `Verificar el correo: ${data.email}`){
        setResponseError('');
        setResponseReset(`Verificar el correo: ${data.email}`);
        reset({email:''});
      } else if(response?.data.data.code === "auth/user-not-found"){
        setResponseError("auth/user-not-found")
      }
    } catch(error) {
      console.log('error: ', error);
    } finally {
      setPreLoad(false);
    }
  }
  useEffect(() => {
    return () => {
      setResponseReset('');
      setResponseError('');
    };
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeIn"
      >
        <>
        <Box sx={style}>
          {responseReset == "" ? (
            <>
              <form
                onSubmit={handleSubmit(handleSubmitResetPassword)}
              >
                <h3 className="createFiling">Reestablecer Contraseña</h3>
                <div className="md:flex md:flex-wrap">
                  <article className="w-full">
                    <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                      Te enviaremos un correo donde podras reestablecer la
                      contraseña
                    </label>
                    <input type="text"
                      {...register("email", { required: true, pattern: reqExp.email })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rouded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder='correo@dominio.com'
                    />
                    {errors.email?.type === 'required' && <span className='form-login-error'>Correo requerido</span> }
                    {errors.email?.type === 'pattern' && <span className='form-login-error'>Revisa bien, no es un formato de correo</span> }
                  </article>
                    <span className='form-login-error'>
                      {responseError === "auth/user-not-found" && "email no existente en la base de datos" }
                    </span>
                </div>
                <button
                  type="submit"
                  className="w-28 py-2 mt-6  bg-blue-800 text-white rounded cursor-pointer"
                >Recuperar</button>
              </form>
            </>
          ) : (
            <>
              <div className="main-container">
                <div className="check-container">
                  <div className="check-background">
                    <svg
                      viewBox="0 0 65 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 25L27.3077 44L58.5 7"
                        stroke="white"
                        strokeWidth="13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="check-shadow"></div>
                </div>
              </div>
              <h1 className="my-2 text-2xl font-extrabold tracking-tight leading-tight text-center">
                Hemos enviado un correo para que puedas recuperar tu contraseña
              </h1>
              <h3 className="text-center text-xl animate__animated animate__fadeIn">
                {responseReset}
              </h3>
            </>
          )}
        </Box>
        <LoadingMUI/>
        </>
      </Modal>
    </>
  );
}
