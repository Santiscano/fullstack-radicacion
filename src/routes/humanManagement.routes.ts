import { Router } from 'express';
import { getEmployeeById, getEmployees } from '../controllers/GH/users.controller';
import { employeeFilter } from '../controllers/GH/filter.controller';
import { getAllPosition } from "../controllers/GH/position.controller"

// MIDDLEWARES
import { decodeToken } from '../middleware/manage.token';
import { validateApikey } from '../middleware/manage.apikey';

const humanManagement = Router();

humanManagement.get("/getEmployees", validateApikey, getEmployees);
humanManagement.get("/getEmployeeById/:idusers", validateApikey, getEmployeeById );
humanManagement.post("postEmployee",decodeToken, validateApikey, );
humanManagement.put("putEmployee",decodeToken, validateApikey, );
humanManagement.delete("deleteEmployee",decodeToken, validateApikey, );


//POSITION
humanManagement.get("/getAllPosition", getAllPosition);

// FILTERS
humanManagement.post("/employeeFilter", employeeFilter);


export default humanManagement;