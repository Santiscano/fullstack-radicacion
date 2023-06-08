import { Router } from 'express';
import { getEmployeeById, getEmployees } from '../controllers/GH/users.controller';
import { employeeFilter } from '../controllers/GH/filter.controller';


// MIDDLEWARES
import { decodeToken } from '../middleware/manage.token';
import { validateApikey } from '../middleware/manage.apikey';

const humanManagement = Router();

humanManagement.get("/getEmployees", decodeToken, validateApikey, getEmployees);
humanManagement.get("/getEmployeeById/:idusers",decodeToken, validateApikey, getEmployeeById );
humanManagement.post("postEmployee",decodeToken, validateApikey, );
humanManagement.put("putEmployee",decodeToken, validateApikey, );
humanManagement.delete("deleteEmployee",decodeToken, validateApikey, );


// FILTERS
humanManagement.post("/employeeFilter", employeeFilter);


export default humanManagement;