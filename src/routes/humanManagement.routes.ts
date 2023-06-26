import { Router } from 'express';
import { getEmployeeById, getEmployees } from '../controllers/GH/users.controller';
import { employeeFilter } from '../controllers/GH/filter.controller';
import { getAllPosition, postPosition, deletePosition } from "../controllers/GH/position.controller"
import { getPersonalInformation, postPersonalInformation, putPersonalInformation, deletePersonalInformation } from '../controllers/GH/personal_information.controller';

// MIDDLEWARES
import { decodeToken } from '../middleware/manage.token';
import { validateApikey } from '../middleware/manage.apikey';

const humanManagement = Router();


humanManagement.get("/getEmployees", getEmployees);
humanManagement.get("/getEmployeeById/:idusers", getEmployeeById );
humanManagement.post("/postEmployee", );
humanManagement.put("/putEmployee", );
humanManagement.delete("/deleteEmployee", );

// INFORMACIÓN PERSONAL
humanManagement.get('/getPersonalInformation', getPersonalInformation);                   // TRAER TODA LA INFORMACIÓN PERSONAL
humanManagement.post('/postPersonalInformation', postPersonalInformation);                // CREAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
humanManagement.put('/putPersonalInformation', putPersonalInformation);                   // EDITAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
humanManagement.post('/deletePersonalInformation', deletePersonalInformation);            // ELIMINAR LA INFORMACIÓN PERSONAL DE UN USUARIO

//POSITION_COMPANY
humanManagement.get("/getAllPosition", getAllPosition);
humanManagement.post("/postPosition", postPosition);
humanManagement.delete("/deletePosition/:id", deletePosition);

// FILTERS
humanManagement.post("/employeeFilter", employeeFilter);


export default humanManagement;