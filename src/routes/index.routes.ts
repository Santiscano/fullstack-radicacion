import { Router } from 'express';

// Importando controladores de las rutas
import { getRoles, postRol, putRol, deleteRol } from '../controllers/roles.controller';
import { getSedes, postSede, putSede, deleteSede } from '../controllers/sedes.controller';
import { getUsers, postUsers, putUsers, deleteUser, postMassiveUsers } from '../controllers/users.controller';
import { getFiles, postFile, putFile, deleteFile, genFileRegistered } from '../controllers/files.controller';
import { getFileStates, postFileStates, putFileStates, deleteFileStates } from '../controllers/files_states.controller';
import { centerCostTable } from '../controllers/centerCost/centerCostTable.controller';
import { getCostArea, postCostArea, deleteCostArea } from '../controllers/centerCost/p1_area_cost_center.controller';
import { getCostSubArea, getCostSubAreaById, postCostSubArea, deleteCostSubArea } from '../controllers/centerCost/p2_sub_area_cost_center.controller';
import { getCostCenter, getCostCenterById, postCostCenter, deleteCostCenter } from '../controllers/centerCost/p3_cost_center.controller';
import { getFilesPath, postChargeFilePath, postFilePath, deleteFilePath } from '../controllers/files_path.controller';
import { createUser, logIn, validateUser, changePassword } from '../controllers/firebase/firebase.controller'
import { showTable, pendingTable } from '../controllers/showTable.controller';
import { getAllRegisteredFile, getIdentificationByType, getTypeIdentification, registeredFilter, accountTypeFilter } from '../controllers/filters.controller';
import { getTrackings, getTracking } from '../controllers/tracking.controller';
import { uploadFileDocument } from '../controllers/upload/googleBucket.controller';

// API's ROUTES
import { routerApi } from '../controllers/routes.controllers' 


const router = Router();

// Roles
router.post('/getRoles', getRoles);                             // Traer roles
router.post('/postRol', postRol);                               // Crear un rol
router.put('/putRol', putRol);                                  // Editar un rol
router.post('/deleteRol', deleteRol);                         // Eliminar un rol

// Sedes
router.post('/getSedes', getSedes);                             // Traer sedes
router.post('/postSede', postSede);                             // Crear sedes
router.put('/putSede', putSede);                                // Editar sedes
router.post('/deleteSede', deleteSede);                       // Eliminar sedes

// Usuarios
router.post('/getUsers', getUsers);                             // Traer usuarios
router.post('/postUser', postUsers);                            // Crear usuario
router.put('/putUser', putUsers);                               // Editar usuario
router.post('/deleteUser', deleteUser);                       // Eliminar un usuario

// Estado de archivos
router.post('/getStatesFiles', getFileStates);                  // Traer los estados de los archivos
router.post('/postStatesFile', postFileStates);                 // Agregar los estados de los archivos
router.put('/putStatesFile', putFileStates);                    // Editar los estados de los archivos
router.post('/deleteStatesFile', deleteFileStates);           // Eliminar un estado de archivo

// Archivos
router.post('/genFileRegistered', genFileRegistered);           // Generar un radicado (No DB)
router.post('/getFiles', getFiles);                             // Traer los archivos
router.post('/postFile', postFile);                             // Agregar un archivo
router.put('/putFile', putFile);                                // Editar un archivo
router.post('/deleteFile', deleteFile);                       // Eliminar un archivo

// Ruta de los Archivos
router.post('/getFilesPath', getFilesPath);                     // Traer todas las rutas de los archivos
router.post('/postChargeFilePath/:idfiles/:files_path_observation', postChargeFilePath);                   // Crear la ruta de los archivos
router.post('/postFilePath', postFilePath);                     // Crear la ruta de los archivos
router.post('/deleteFilePath', deleteFilePath);               // Crear la ruta de los archivos

// Tracking
router.post('/getTrackings', getTrackings);                     // Traer todos la trazabilidad
router.post('/getTracking', getTracking);                       // Traer una ruta en especifico

// Centros de costos

// Table
router.get('/centerCostTable', centerCostTable);                // TABLA CENTRO DE COSTOS

// Area
router.post('/getCostArea', getCostArea);                       // Traer area del centro de costo
router.post('/postCostArea', postCostArea);                     // Crear area del centro de costo
router.post('/deleteCostArea', deleteCostArea);               // Eliminar area del centro de costo

// Sub Area
router.post('/getCostSubArea', getCostSubArea);                 // Traer area del centro de costo
router.post('/getCostSubAreaById', getCostSubAreaById);                   // Traer area del centro de costo
router.post('/postCostSubArea', postCostSubArea);               // Crear area del centro de costo
router.post('/deleteCostSubArea', deleteCostSubArea);         // Eliminar area del centro de costo

// Centro de costos
router.post('/getCostCenter', getCostCenter);                   // Traer area del centro de costo
router.post('/getCostCenterById', getCostCenterById);                   // Traer area del centro de costo
router.post('/postCostCenter', postCostCenter);                 // Crear area del centro de costo
router.post('/deleteCostCenter', deleteCostCenter);           // Eliminar area del centro de costo

// Firebase
router.post('/createUser', createUser);                         // Crear usuario en firebase
router.post('/logIn', logIn);                                   // Validar usuario logeado en firebase
router.post('/validateUser', validateUser);                     // Validar usuario por medio del token
router.post('/changePassword', changePassword);                 // Cambiar la contraseña por medio del correo

// Upload File (Google Cloud)
router.post('/uploadFileDocument/:idfiles', uploadFileDocument);         // Cargar una imagen en el bucket

//Tablas
router.post('/showTable', showTable);                           // Todos los archivos
router.post('/pendingTable', pendingTable);                     // Pendientes

// Filtros
router.post('/getAllRegisteredFile', getAllRegisteredFile);     // Filtro de los archivos según el radicado
router.post('/getIdentificationByType', getIdentificationByType);     // Filtro de los archivos según el radicado
router.post('/getTypeIdentification', getTypeIdentification);     // Filtro de los archivos según el radicado
router.post('/registeredFilter', registeredFilter);             // Filtro de los archivos según el radicado
router.post('/accountTypeFilter', accountTypeFilter);           // Filtro de los archivos según cuenta de cobro y numero de la cuenta

// API routes
router.get('/routerApi', routerApi);                            // Traer las rutas que tiene el sistema

// E-CONTROL
router.post('/postMassiveUsers', postMassiveUsers);


// Exportando el router
export default router;