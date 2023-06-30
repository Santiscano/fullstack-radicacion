import { Router } from 'express';
import path from 'path';

// Importando controladores de las rutas
import { getRoles, postRol, putRol, deleteRol, getRolesNotAdminProvider, getRolProvider, getIdRol, getRolesName } from '../controllers/roles.controller';
import { getSedes, postSede, putSede, deleteSede, getSedesName, getIdSedes } from '../controllers/sedes.controller';
import { getUsers, getNoAdminProv, postUsers, putUsers, deleteUser, getUserbyRol } from '../controllers/users.controller';
import { getFiles, postFile, putFile, deleteFile, genFileRegistered } from '../controllers/files.controller';
import { getFileStates } from '../controllers/files_states.controller';
import { centerCostTable } from '../controllers/centerCost/centerCostTable.controller';
import { getCostArea, postCostArea, deleteCostArea } from '../controllers/centerCost/p1_area_cost_center.controller';
import { getCostSubArea, getCostSubAreaById, postCostSubArea, deleteCostSubArea } from '../controllers/centerCost/p2_sub_area_cost_center.controller';
import { getCostCenter, getCostCenterById, postCostCenter, deleteCostCenter } from '../controllers/centerCost/p3_cost_center.controller';
import { getFilesPath, postChargeFilePath, postFilePath, deleteFilePath } from '../controllers/files_path.controller';
import { createUser, logIn, validateUser, changePassword } from '../controllers/firebase/firebase.controller'
import { showTable, fileShowTable, pendingTable, historyTable } from '../controllers/showTable.controller';
import { getAllRegisteredFile, getIdentificationByType, getTypeIdentification, registeredFilter, accountTypeFilter, actionFilter, usersFilterToNextAuditor, usersFilterReturnAuditor, pendingReport, finishedReport } from '../controllers/filters.controller';
import { getTrackings, getTrackingRegistered, getTrackingAccountType } from '../controllers/tracking.controller';
import { uploadFileDocument } from '../controllers/upload/googleBucket.controller';

// MIDDLEWARE TOKEN
import { decodeToken } from '../middleware/manage.token';

// API's ROUTES
import { routerApi } from '../controllers/routes.controllers' 


const router = Router();

// Roles
router.get('/getRoles', getRoles);                             // Traer roles
router.get('/getRolesName', getRolesName);                     // Traer nombre Roles
router.get('/getIdRol',getIdRol);                              // Trea el idroles segun el nombre del rol
router.get('/getNotAdminProv', getRolesNotAdminProvider);      // Traer !== Admin & Provider
router.get('/getProvider', getRolProvider);                  // Traer Provider
router.post('/postRol', postRol);                              // Crear un rol
router.put('/putRol', putRol);                                 // Editar un rol
router.post('/deleteRol', deleteRol);                          // Eliminar un rol

// Sedes
router.get('/getSedes', getSedes);                             // Traer sedes
router.get('/getIdSedes', getIdSedes);                      // Traer sedes_name
router.get('/getSedesName', getSedesName);                      // Traer sedes_name
router.post('/postSede', postSede);                             // Crear sedes
router.put('/putSede', putSede);                                // Editar sedes
router.post('/deleteSede', deleteSede);                       // Eliminar sedes

// Usuarios
router.get('/getUsers', getUsers);                             // Traer usuarios
router.get('/getNoAdminProv',getNoAdminProv)                   //traer todos los usuarios menos admin y proveedores
router.post('/getUserbyRol', getUserbyRol);             // Traer los usuarios según el rol
router.post('/postUser', postUsers);                            // Crear usuario
router.put('/putUser', putUsers);                               // Editar usuario
router.post('/deleteUser', deleteUser);                       // Eliminar un usuario

// Estado de archivos
router.get('/getStatesFiles', getFileStates);                  // Traer los estados de los archivos

// Archivos
router.get('/genFileRegistered', genFileRegistered);           // Generar un radicado (No DB)
router.post('/getFiles', getFiles);                             // Traer los archivos
router.post('/postFile', postFile);                             // Agregar un archivo
router.put('/putFile', putFile);                                // Editar un archivo
router.post('/deleteFile', deleteFile);                       // Eliminar un archivo

// Ruta de los Archivos
router.post('/getFilesPath', getFilesPath);                     // Traer todas las rutas de los archivos
router.post('/postChargeFilePath/:idfiles/:files_path_observation/:userSession', postChargeFilePath);                   // Crear la ruta de los archivos
router.post('/postFilePath', postFilePath);                     // Crear la ruta de los archivos
router.post('/deleteFilePath', deleteFilePath);               // Crear la ruta de los archivos

// Tracking
router.get('/getTrackings', getTrackings);                     // Traer todos la trazabilidad
router.post('/getTrackingRegistered', getTrackingRegistered);                       // Traer una ruta en especifico
router.post('/getTrackingAccountType', getTrackingAccountType);                       // Traer una ruta en especifico

// Centros de costos

// Table
router.get('/centerCostTable', centerCostTable);                       // TABLA CENTRO DE COSTOS

// Area
router.post('/getCostArea', getCostArea);                              // Traer area del centro de costo
router.post('/postCostArea', postCostArea);                            // Crear area del centro de costo
router.post('/deleteCostArea', deleteCostArea);                        // Eliminar area del centro de costo

// Sub Area
router.post('/getCostSubArea', getCostSubArea);                        // Traer area del centro de costo
router.post('/getCostSubAreaById', getCostSubAreaById);                // Traer area del centro de costo
router.post('/postCostSubArea', postCostSubArea);                      // Crear area del centro de costo
router.post('/deleteCostSubArea', deleteCostSubArea);                  // Eliminar area del centro de costo

// Centro de costos
router.post('/getCostCenter', getCostCenter);                          // Traer area del centro de costo
router.post('/getCostCenterById', getCostCenterById);                  // Traer area del centro de costo
router.post('/postCostCenter', postCostCenter);                        // Crear area del centro de costo
router.post('/deleteCostCenter', deleteCostCenter);                    // Eliminar area del centro de costo

// Firebase
router.post('/createUser', createUser);                                             // Crear usuario en firebase
router.post('/logIn', logIn);                                                       // Validar usuario logeado en firebase
router.post('/validateUser', validateUser);                                         // Validar usuario por medio del token
router.post('/changePassword', changePassword);                                     // Cambiar la contraseña por medio del correo

// Upload File (Google Cloud)
router.post('/uploadFileDocument/:idfiles/:files_type', uploadFileDocument);       // Cargar una imagen en el bucket

// TABLAS
router.get('/showTable', showTable);                                   // Todos los archivos
router.post('/pendingTable', pendingTable);                            // Pendientes
router.post('/fileShowTable', fileShowTable);                          // Todos los archivos
router.post('/historyTable', historyTable);                            // Pendientes

// Filtros
router.get('/getAllRegisteredFile', getAllRegisteredFile);             // Filtro de los archivos según el radicado
router.post('/getIdentificationByType', getIdentificationByType);      // Filtro de los archivos según el radicado
router.get('/getTypeIdentification', getTypeIdentification);           // Filtro de los archivos según el radicado
router.post('/registeredFilter', registeredFilter);                    // Filtro de los archivos según el radicado
router.post('/accountTypeFilter', accountTypeFilter);                  // Filtro de los archivos según cuenta de cobro y numero de la cuenta
router.post('/actionFilter', actionFilter);                            // Filtro de los estados de archivo según rol usuario
router.post('/usersFilterToNextAuditor', usersFilterToNextAuditor);    // Filtro de siguiente asignado según rol usuario
router.get('/usersFilterReturnAuditor', usersFilterReturnAuditor);    // Filtro de lista de auditores o gerente
router.post('/pendingReport', pendingReport);                            // Reportero Pendiente
router.post('/finishedReport', finishedReport);                          // Reportero Finalizados

// API routes
router.get('/routerApi', routerApi);                                                // Traer las rutas que tiene el sistema

//RUTA PARA ACCEDER A LOS ARCHIVOS DEL SERVIDOR
router.get("/archivos/:archivo", (req, res)=>{
    const {archivo} = req.params
    res.sendFile(path.join(__dirname, `../../temp/${archivo}`))
});

// Exportando el router
export default router;