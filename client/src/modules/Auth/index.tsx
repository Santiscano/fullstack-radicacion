import { useContext, useEffect, useState } from 'react';
import './auth.css';

// components
import FormLogin from '../../components/common/FormLogin';
import Loading from '../../components/common/Loading';
// mui
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// images
import security from '../../assets/images/cyber-security.png';
import logo from '../../assets/images/LOGOTIPO ENVIEXPRESS 85x85.png'
import { GeneralValuesContext } from '../../Context/GeneralValuesContext';
import { Navigate, redirect } from 'react-router-dom';
import ModalResetPassword from '../../components/common/ModalResetPassword';
import LoadingMUI from './../../components/common/LoadingMUI/index';



function index() {
  const { user, isLoading, errorLogin, setIsLoading } = useContext(GeneralValuesContext);

  const [open, setOpen] = useState(false);
  const handleOpenResetPassword  = () => setOpen(true);
  const handleCloseResetPassword = () => setOpen(false);

  const handleInit = () => {

  };


  useEffect(()=> {
    if(user){
      redirect("/dashboard/home")
    }
    setIsLoading(false);
    setTimeout(() => {
    }, 300)
  },[])

  return (
    <>
      {/* {!user && <Navigate to="/dashboard/home"/> } */}
      { isLoading ?
      <div className='w-screen h-screen flex flex-col justify-center'>
        <Loading/>
      </div>
      :
      <div className='login sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 min-h-screen '>
        {/* left */}
        <div className='flex items-center justify-center w-auto min-h-screen md:w-1/2 md:py-4 md:px-4 p-4 md:p-4 rounded-2xl md:rounded-none shadow md:shadow-none'>
          <div className='w-full max-w-80 sm:w-80 mx-auto sm:mx-0 '>
            {/* logo */}
            <div className='flex justify-center'>
              <img src={logo} alt="logo enviexpress" className='w-40' />
            </div>

            {errorLogin && <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>
              {
                errorLogin === "auth/too-many-requests" ? 'Tienes demasiados intentos fallidos'
                : errorLogin === "auth/user-not-found" ? 'Usuario no registrado'
                : errorLogin === "auth/wrong-password" ? 'Contraseña erronea'
                : 'Algo a Fallado'
              }
              </strong> <br/>
              {
                errorLogin === "auth/too-many-requests"
                &&
                <button
                  className='text-blue-800 mt-2 font-bold underline'
                  onClick={handleOpenResetPassword}
                >¿Olvidaste la contraseña?</button>
              }
            </Alert>
            }
            <ModalResetPassword
              open={open}
              close={handleCloseResetPassword}
            />
            {/* titulo */}
            <h3 className='mt-8 text-2xl font-extrabold tracking-tight leading-tight'>Ingresar</h3>
            <LoadingMUI/>
            <FormLogin />
          </div>
        </div>

        <div className='bg-rigth relative hidden md:flex flex-auto flex-col items-center justify-center w-1/2 min-h-screen p-16 lg:px-16 overflow-hidden dark:border-l'>
            <img src={security} alt="segurity login" className='max-w-xs' />
            <div className='flex flex-col'>
              <h2 className='text-white text-4xl mt-8 mx-auto'>Digitalización</h2>
              <h4 className='text-white text-l text-center mt-2 mx-auto'>
                aliado estratégico para la gestion de archivos y procesos en tu negocio
                </h4>
            </div>
        </div>
      </div>
      }
    </>
  )
}

export default index
