import { useNavigate } from 'react-router-dom';
import useContextProvider from '../Context/GeneralValuesContext';
import { remove } from '../components/tools/SesionSettings';

const useCatch = () => {
  const { handleMessageSnackbar } = useContextProvider();
  const navigate = useNavigate();

  const handleCatch = (err:any) => {
    console.log('useCath: ', err);
    // @ts-ignore
    const message = err.response.data.message
    console.log('message: ', message);
    handleMessageSnackbar("error", message);
    if( message == "TOKEN_EXPIRED" || message == "INVALID_TOKEN_ACCESS" || "UNDEFINED_TOKEN_ACCESS"){
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
