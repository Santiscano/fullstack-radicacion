import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextProvider from "../../../../Context/GeneralValuesContext";
import { login, validateUserFirebase } from "../../../../services/Firebase.routes";
import "./formLogin.css";
import { useUserSession } from './../../../../redux/Redux-actions/useUserSession';

type Login = {
  email: string;
  password: string;
};

function index() {
  // useContext
  const { setPreLoad, setErrorLogin, setUser, setIsLoading } = useContextProvider();

  // redux
  const { addUserSession } = useUserSession();

  const navigate = useNavigate();

  const reqExp = {
    email:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      setPreLoad(true);
      const loger = await login(data.email, data.password);
      console.log("loger: ", loger);
      if (loger?.status === 200) {
        setErrorLogin(undefined);
        const userValidate = await validateUserFirebase();
        console.log("userValidate: ", userValidate);
        const userLogin = userValidate?.data.data;
        console.log("userLogin: ", userLogin);
        addUserSession(userLogin);
        if ( userValidate?.status === 200 && userValidate?.data.data.users_status === "ACTIVO" ) {
          setPreLoad(false);
          setIsLoading(true);
          setUser(userLogin);
          addUserSession(userLogin);
          navigate("/dashboard/home");
          console.log("navigate home");
        }
      } else {
        console.log('error',loger?.data.message)
        setErrorLogin(loger?.data.message);
      }
    } catch (error) {
      console.log("error login: ", error);
      navigate("/errorServer500");
    } finally {
      setPreLoad(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Correo Electrónico
          </label>
          <input
            type="text"
            {...register("email", { required: true, pattern: reqExp.email })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rouded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="correo@dominio.com"
          />
          {errors.email?.type === "required" && (
            <span className="form-login-error">
              Se requiere el correo electrónico
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="form-login-error">
              Revisa bien, no es un formato de Correo.
            </span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 4 })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rouded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Contraseña"
          />
          {errors.password?.type === "required" && (
            <span className="form-login-error">Se requiere la contraseña</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="form-login-error">
              La contraseña debe tener minimo 6 caracteres
            </span>
          )}
        </div>

        <input
          type="submit"
          value="Entrar"
          className="w-full py-2 mt-6  bg-blue-800 text-white rounded cursor-pointer "
        ></input>
      </form>
    </>
  );
}

export default index;
