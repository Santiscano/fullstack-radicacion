import { Route, Routes } from "react-router-dom";
import { Paper, ThemeProvider } from "@mui/material";
import forbidden403Img from "./assets/images/403.jpg";
import notFound404Img from "./assets/images/404.png";
import errorServerImg from "./assets/images/500.jpg";
import "./App.css";
import { Styles } from "./config/theme.config";
import Admin from "./modules/Admin";
import Auth from "./modules/Auth";
import AttachFile from "./Layout/AttachFile";
import Error from "./Layout/Error";
import GenerateFiles from "./Layout/GenerateFiles";
import Ti from "./Layout/Ti";
import AllEmployees from "./Layout/AllEmployees";
import AllFilesTable from "./Layout/AllFilesTable";
import AttachEmployeeDocuments from "./Layout/AttachEmployeeDocuments";
import Home from "./Layout/Home/index";
import PendingFilesTable from "./Layout/PendingFilesTable/index";
import SearchEmployee from "./Layout/SearchEmployee";
import History from "./Layout/History";
import TableAllCostCenter from "./Layout/TableAllCostCenter";
import Tracking from "./Layout/Tracking/Tracking";
import MoveElement from "./Layout/MoveElement";
import QRCodeComponent from './Layout/QRCodeComponent'
import {
  optionsViewsAllFiles,
  optionsViewsFiles,
  optionsViewsHumanManagement,
  optionsViewsNotAuditors,
  optionsViewsSettled,
  optionsViewsTI,
  optionsViewsDevelopment
} from "./components/tools/OptionsValuesSelects";
import NotAuthentication from "./Middlewares/NotAuthentication";
import WithAuthentication from "./Middlewares/WithAuthentication";
import { WithRoleAllowedComponent } from "./Middlewares/WithRoleAllowed";
import BussinessGroup from "./modules/Global/BussinessGroup";
import WebViewer from "./Layout/WebViewer";
import ViewConstructor from "./Layout/ViewConstructor";
import Reporter from "./Layout/Reporter";
// import NewEmployeeTest from "./Layout/NewEmployee";

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

              {/* radicacion */}
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

              {/* mis archivos */}
              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsFiles}
                  />
                }
              >
                <Route path="pendientes" element={<PendingFilesTable />} />
                <Route path="historial" element={<History/>} />
              </Route>

              {/* todos los archivos - trazabilidad */}
              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsAllFiles}
                  />
                }
              >
                <Route element={
                  <WithRoleAllowedComponent
                    // @ts-ignore
                    allowedRolesList={optionsViewsNotAuditors}
                  />
                }>
                  <Route path="todos-los-archivos" element={<AllFilesTable />} />
                </Route>
                <Route path="trazabilidad" element={<Tracking/>} />
              </Route>

              {/* reporter */}
              <Route element={<WithRoleAllowedComponent allowedRolesList={optionsViewsNotAuditors}/>}>
                <Route path="reporter" element={<Reporter/>}/>
              </Route>

              {/* admin */}
              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent allowedRolesList={optionsViewsTI} />
                }
              >
                <Route path="admin" element={<Ti />} />
              </Route>

              {/* centros de costos */}
              <Route
                path="centros-de-costos"
                element={<TableAllCostCenter />}
              ></Route>

              {/* Gestion Humnana  */}
              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsHumanManagement}
                  />
                }
              >
                <Route path="todos-los-empleados" element={<AllEmployees />} />
                {/* <Route path="test" element={<NewEmployeeTest/>} /> */}
                <Route path="todos-los-empleados" element={<AllEmployees />} />
                <Route
                  path="adjuntar-documentos-empleado"
                  element={<AttachEmployeeDocuments />}
                />
                <Route path="buscar-empleado" element={<SearchEmployee />} />
              </Route>

              {/* modulo de desarrollo */}
              <Route
                element={
                  // @ts-ignore
                  <WithRoleAllowedComponent
                    allowedRolesList={optionsViewsDevelopment}
                  />
                }
              >
                <Route path="mover-elementos-mouse" element={<MoveElement/>} />
                <Route path="qr" element={<QRCodeComponent/>}/>
                <Route path="excel" element={<WebViewer/>}/>
                <Route path="vista-en-construccion" element={<ViewConstructor/>}/>
              </Route>

            </Route>
          </Route>

          {/* Grupo Empresarial */}
          <Route
            path="QR/grupoEmpresarial"
            element={<BussinessGroup/>}
          />

          {/* no tienes permisos */}
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

          {/* error servidor */}
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

          {/* ruta no existente */}
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
