import {
  validateHasRoleAllowed,
  // validateHasRoleAllowedPromise,
} from "../components/tools/SesionSettings";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

/**
 *
 * @param param0 children que se mostrara
 * @param param1 lista de roles que podran ver el resultado
 * @returns componente
 */
export function WithRoleAllowedRoutes({ children, allowedRolesList }: any) {
  return validateHasRoleAllowed(allowedRolesList) ? <>{children}</> : null;
}

// export default WithRoleAllowed;

/**
 * esto esta sin terminar y la logica es que si es componente entonces haga la redirecion
 * pero debo asimilarlo a la logica del otro middleware que valida y lleva al outlet
 */
export function WithRoleAllowedComponent({ children, allowedRolesList }: any) {
  console.log("Lista permitida: ", allowedRolesList);
  const navigate = useNavigate();
  const allowed = validateHasRoleAllowed(allowedRolesList);
  console.log("allowed: ", allowed);

  useEffect(() => {
    if (!allowed) {
      navigate("/forbidden403");
    }
  }, [allowed]);

  return <Outlet />;
}

// const NotAuthentication = () => {
//   const navigate = useNavigate();
//   const token = session();
//   console.log("token: ", token);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//   }, [token]);

//   return <Outlet />;
// };
