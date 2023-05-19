import { Router } from 'express';

// Importando controladores de las rutas
import { getRoles, postRol, putRol, deleteRol, getRolesNotAdminProvider, getRolProvider } from '../controllers/roles.controller';
import { getSedes, postSede, putSede, deleteSede } from '../controllers/sedes.controller';
import { getUsers, postUsers, putUsers, deleteUser, getUsersNotAdminProvider } from '../controllers/users.controller';
import { getFiles, postFile, putFile, deleteFile, genFileRegistered } from '../controllers/files.controller';
import { getFileStates } from '../controllers/files_states.controller';
import { centerCostTable } from '../controllers/centerCost/centerCostTable.controller';
import { getCostArea, postCostArea, deleteCostArea } from '../controllers/centerCost/p1_area_cost_center.controller';
import { getCostSubArea, getCostSubAreaById, postCostSubArea, deleteCostSubArea } from '../controllers/centerCost/p2_sub_area_cost_center.controller';
import { getCostCenter, getCostCenterById, postCostCenter, deleteCostCenter } from '../controllers/centerCost/p3_cost_center.controller';
import { getFilesPath, postChargeFilePath, postFilePath, deleteFilePath } from '../controllers/files_path.controller';
import { createUser, logIn, validateUser, changePassword } from '../controllers/firebase/firebase.controller'
import { showTable, pendingTable, historyTable } from '../controllers/showTable.controller';
import { getAllRegisteredFile, getIdentificationByType, getTypeIdentification, registeredFilter, accountTypeFilter, actionFilter } from '../controllers/filters.controller';
import { getTrackings, getTrackingRegistered, getTrackingAccountType } from '../controllers/tracking.controller';
import { uploadFileDocument } from '../controllers/upload/googleBucket.controller';

// MIDDLEWARE TOKEN
import { decodeToken } from '../middleware/manage.token';

// API's ROUTES
import { routerApi } from '../controllers/routes.controllers' 


const router = Router();

// Roles
router.get('/getRoles', decodeToken, getRoles);                             // Traer roles
router.get('/getNotAdminProv', decodeToken, getRolesNotAdminProvider);      // Traer !== Admin & Provider
router.get('/getProvider', decodeToken, getRolProvider);                  // Traer Provider
router.post('/postRol', decodeToken, postRol);                              // Crear un rol
router.put('/putRol', decodeToken, putRol);                                 // Editar un rol
router.post('/deleteRol', decodeToken, deleteRol);                          // Eliminar un rol

// Sedes
router.get('/getSedes', decodeToken, getSedes);                             // Traer sedes
router.post('/postSede', decodeToken, postSede);                             // Crear sedes
router.put('/putSede', decodeToken, putSede);                                // Editar sedes
router.post('/deleteSede', decodeToken, deleteSede);                       // Eliminar sedes

// Usuarios
router.get('/getUsers', decodeToken, getUsers);                             // Traer usuarios
router.get('/getUsersNotAdminProv', decodeToken, getUsersNotAdminProvider); // usuarios !== Admin & Provider
router.post('/postUser', decodeToken, postUsers);                            // Crear usuario
router.put('/putUser', decodeToken, putUsers);                               // Editar usuario
router.post('/deleteUser', decodeToken, deleteUser);                       // Eliminar un usuario

// Estado de archivos
router.get('/getStatesFiles', decodeToken, getFileStates);                  // Traer los estados de los archivos

// Archivos
router.get('/genFileRegistered', decodeToken, genFileRegistered);           // Generar un radicado (No DB)
router.post('/getFiles', decodeToken, getFiles);                             // Traer los archivos
router.post('/postFile', decodeToken, postFile);                             // Agregar un archivo
router.put('/putFile', decodeToken, putFile);                                // Editar un archivo
router.post('/deleteFile', decodeToken, deleteFile);                       // Eliminar un archivo

// Ruta de los Archivos
router.post('/getFilesPath', decodeToken, getFilesPath);                     // Traer todas las rutas de los archivos
router.post('/postChargeFilePath/:idfiles/:files_path_observation/:userSession', decodeToken, postChargeFilePath);                   // Crear la ruta de los archivos
router.post('/postFilePath', decodeToken, postFilePath);                     // Crear la ruta de los archivos
router.post('/deleteFilePath', decodeToken, deleteFilePath);               // Crear la ruta de los archivos

// Tracking
router.get('/getTrackings', decodeToken, getTrackings);                     // Traer todos la trazabilidad
router.post('/getTrackingRegistered', decodeToken, getTrackingRegistered);                       // Traer una ruta en especifico
router.post('/getTrackingAccountType', decodeToken, getTrackingAccountType);                       // Traer una ruta en especifico

// Centros de costos

// Table
router.get('/centerCostTable', decodeToken, centerCostTable);                // TABLA CENTRO DE COSTOS

// Area
router.post('/getCostArea', decodeToken, getCostArea);                       // Traer area del centro de costo
router.post('/postCostArea', decodeToken, postCostArea);                     // Crear area del centro de costo
router.post('/deleteCostArea', decodeToken, deleteCostArea);               // Eliminar area del centro de costo

// Sub Area
router.post('/getCostSubArea', decodeToken, getCostSubArea);                 // Traer area del centro de costo
router.post('/getCostSubAreaById', decodeToken, getCostSubAreaById);                   // Traer area del centro de costo
router.post('/postCostSubArea', decodeToken, postCostSubArea);               // Crear area del centro de costo
router.post('/deleteCostSubArea', decodeToken, deleteCostSubArea);         // Eliminar area del centro de costo

// Centro de costos
router.post('/getCostCenter', decodeToken, getCostCenter);                   // Traer area del centro de costo
router.post('/getCostCenterById', decodeToken, getCostCenterById);                   // Traer area del centro de costo
router.post('/postCostCenter', decodeToken, postCostCenter);                 // Crear area del centro de costo
router.post('/deleteCostCenter', decodeToken, deleteCostCenter);           // Eliminar area del centro de costo

// Firebase
router.post('/createUser', createUser);                         // Crear usuario en firebase
router.post('/logIn', logIn);                                   // Validar usuario logeado en firebase
router.post('/validateUser', validateUser);                     // Validar usuario por medio del token
router.post('/changePassword', changePassword);                 // Cambiar la contraseña por medio del correo

// Upload File (Google Cloud)
router.post('/uploadFileDocument/:idfiles', decodeToken, uploadFileDocument);         // Cargar una imagen en el bucket

// TABLAS
router.get('/showTable', decodeToken, showTable);                               // Todos los archivos
router.post('/pendingTable', decodeToken, pendingTable);                        // Pendientes
router.post('/historyTable', decodeToken, historyTable);                        // Pendientes

// Filtros
router.get('/getAllRegisteredFile', decodeToken, getAllRegisteredFile);     // Filtro de los archivos según el radicado
router.post('/getIdentificationByType', decodeToken, getIdentificationByType);     // Filtro de los archivos según el radicado
router.get('/getTypeIdentification', decodeToken, getTypeIdentification);     // Filtro de los archivos según el radicado
router.post('/registeredFilter', decodeToken, registeredFilter);             // Filtro de los archivos según el radicado
router.post('/accountTypeFilter', decodeToken, accountTypeFilter);           // Filtro de los archivos según cuenta de cobro y numero de la cuenta
router.post('/actionFilter', actionFilter);           // Filtro de los archivos según cuenta de cobro y numero de la cuenta

// API routes
router.get('/routerApi', routerApi);                            // Traer las rutas que tiene el sistema


// Exportando el router
export default router;