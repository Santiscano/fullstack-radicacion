import { Router } from 'express';

import { getPersonalInformation, postPersonalInformation, putPersonalInformation, deletePersonalInformation } from '../controllers/personal_information.controller';

// MIDDLEWARE TOKEN
import { decodeToken } from '../middleware/manage.token';

const routerSig = Router();

// INFORMACIÓN PERSONAL
routerSig.get('/getPersonalInformation', getPersonalInformation);                   // TRAER TODA LA INFORMACIÓN PERSONAL
routerSig.post('/postPersonalInformation', postPersonalInformation);                // CREAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
routerSig.put('/putPersonalInformation', putPersonalInformation);                   // EDITAR LA INFORMACIÓN PERSONAL SEGÚN UN USUARIO
routerSig.post('/deletePersonalInformation', deletePersonalInformation);            // ELIMINAR LA INFORMACIÓN PERSONAL DE UN USUARIO


// Exportando el router
export default routerSig;