import { useNavigate } from 'react-router-dom';
import useContextProvider from '../Context/GeneralValuesContext';
import { remove } from '../components/tools/SesionSettings';

const useCatch = () => {
  const { setIsLoading, handleMessageSnackbar } = useContextProvider();
  const navigate = useNavigate();

  /**
   * el parametro es el error el que recibe
   * @param err
   */
  const handleCatch = (err:any) => {
    console.log('useCath: ', err);
    // @ts-ignore
    const message = err.response.data.message
    console.log('message: ', message);
    handleMessageSnackbar("error", message);
    if( message === "TOKEN_EXPIRED" || message === "INVALID_TOKEN_ACCESS" || message === "UNDEFINED_TOKEN_ACCESS"){
      setIsLoading(false);
      console.log('entro a resolver navigate')
      remove("accessToken");
      navigate("/login");
    }
  };
  return {
    handleCatch,
  }
}

export default useCatch
