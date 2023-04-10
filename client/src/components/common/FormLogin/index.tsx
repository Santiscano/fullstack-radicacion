import { useForm, SubmitHandler } from "react-hook-form";
import "./formLogin.css";
import { login, validateUserFirebase } from "../../../services/Firebase.routes";
import { useContext, useEffect } from "react";
import { IsLoadingType } from "../../../interfaces/Loading";
import { GeneralValuesContext } from "../../../Context/GeneralValuesContext";
import { Navigate, redirect, useNavigate } from "react-router-dom";

type Login = {
  email: string;
  password: string;
};

function index() {
  const { setPreLoad, setErrorLogin, setUser, setIsLoading } =
    useContext(GeneralValuesContext);
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
      setErrorLogin(loger?.data.message);
      console.log("loger: ", loger);
      if (loger?.status === 200) {
        const userValidate = await validateUserFirebase();
        console.log("userValidate: ", userValidate);
        if (
          userValidate?.status === 201 &&
          userValidate?.data.users_status === "ACTIVO"
        ) {
          setPreLoad(false);
          setIsLoading(true);
          setUser(userValidate?.data);
          navigate("/dashboard/home");
        }
        // else if (userValidate?.data.users_status !== "ACTIVO") {
        //   navigate("/forbidden403")
        // }
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
            Correo
          </label>
          <input
            type="text"
            {...register("email", { required: true, pattern: reqExp.email })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rouded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="correo@dominio.com"
          />
          {errors.email?.type === "required" && (
            <span className="form-login-error">Correo requerido</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="form-login-error">
              Revisa bien, no es un formato de correo
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
            <span className="form-login-error">Contraseña requerida</span>
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
