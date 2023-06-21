import { Router } from 'express';

import { getPersonalInformation, postPersonalInformation, putPersonalInformation, deletePersonalInformation } from '../controllers/GH/personal_information.controller';

// MIDDLEWARE TOKEN
import { decodeToken } from '../middleware/manage.token';

const routerSig = Router();

// INFORMACIÓN PERSONAL
routerSig.get('/getPersonalInformation', decodeToken, getPersonalInformation);                   // TRAER TODA LA INFORMACIÓN PERSONAL
routerSig.post('/postPersonalInformation', decodeToken, postPersonalInformation);                // CREAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
routerSig.put('/putPersonalInformation', decodeToken, putPersonalInformation);                   // EDITAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
routerSig.post('/deletePersonalInformation', decodeToken, deletePersonalInformation);            // ELIMINAR LA INFORMACIÓN PERSONAL DE UN USUARIO


// Exportando el router
export default routerSig;