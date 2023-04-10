import "./App.css";

import Admin from "./modules/Admin";
import Auth from "./modules/Auth";
// import { NotFound } from './modules/NotFound';
import forbidden403Img from "./assets/images/403.jpg";
import notFound404Img from "./assets/images/404.png";
import errorServerImg from "./assets/images/500.jpg";
import AttachFile from "./Layout/AttachFile";
import Error from "./Layout/Error";
import GenerateFiles from "./Layout/GenerateFiles";
import Ti from "./Layout/Ti";

import { Paper, ThemeProvider } from "@mui/material";

import { Styles } from "./config/theme.config";

import { Route, Routes } from "react-router-dom";
import {
  optionsViewsSettled,
  optionsViewsAuth,
  optionsViewsAllFiles,
  optionsViewsTI,
  optionsViewsDigitization,
} from "./components/tools/OptionsValuesSelects";
import AllEmployees from "./Layout/AllEmployees";
import AllFilesTable from "./Layout/AllFilesTable";
import AttachEmployeeDocuments from "./Layout/AttachEmployeeDocuments";
import Home from "./Layout/Home/index";
import NewEmployee from "./Layout/NewEmployee";
import PendingFilesTable from "./Layout/PendingFilesTable/index";
import SearchEmployee from "./Layout/SearchEmployee";
// import Administracion from "./Layout/Admin";
import NotAuthentication from "./Middlewares/NotAuthentication";
import WithAuthentication from "./Middlewares/WithAuthentication";
import { WithRoleAllowedComponent } from "./Middlewares/WithRoleAllowed";

function App() {
  return (
    <ThemeProvider theme={Styles}>
      <Paper>
        <Routes>
          <Route element={<WithAuthentication />}>
            <Route index element={<Auth />} />
            <Route path="/login" element={<Auth />} />
          </Route>

          <Route element={<NotAuthentication />}>
            <Route path="/dashboard" element={<Admin />}>
              <Route path="home" element={<Home />} />

              {/* Protegidas por roles */}
              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsSettled}
                  />
                }
              >
                <Route path="radicar" element={<GenerateFiles />} />
                <Route path="adjuntar" element={<AttachFile />} />
              </Route>

              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsAuth}
                  />
                }
              >
                <Route path="pendientes" element={<PendingFilesTable />} />
              </Route>

              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsAllFiles}
                  />
                }
              >
                <Route path="todos-los-archivos" element={<AllFilesTable />} />
              </Route>

              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent allowedRolesList={optionsViewsTI} />
                }
              >
                <Route path="admin" element={<Ti />} />
              </Route>

              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsDigitization}
                  />
                }
              >
                <Route path="nuevo-empleado" element={<NewEmployee />} />
                <Route path="todos-los-empleados" element={<AllEmployees />} />
                <Route
                  path="adjuntar-documentos-empleado"
                  element={<AttachEmployeeDocuments />}
                />
                <Route path="buscar-empleado" element={<SearchEmployee />} />
              </Route>
            </Route>
          </Route>

          <Route
            path="forbidden403"
            element={
              <Error
                title="No cuentas con los permisos"
                image={forbidden403Img}
                message1="No tienes los permisos para acceder a esta ruta"
                message2="si consideras que es un error comunicate con el encargado de TI"
              />
            }
          />

          <Route
            path="errorserver500"
            element={
              <Error
                title="Error Interno del servidor"
                image={errorServerImg}
                message1="Disculpanos por los inconvenientes estamos trabajando en solucionarlo"
                message2="intenta nuevamente o comunicate con el area encargada"
              />
            }
          />

          <Route
            path="*"
            element={
              <Error
                title="La Ruta no fue encontrada"
                image={notFound404Img}
                message1="La pagina que estás buscando no está disponible"
                message2="Intente buscar de nuevo o use el botón Regresar para continuar."
              />
            }
          />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
