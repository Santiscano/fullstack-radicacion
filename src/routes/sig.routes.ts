import { Router } from 'express';

import { getPersonalInformation, postPersonalInformation, putPersonalInformation, deletePersonalInformation } from '../controllers/GH/personal_information.controller';

// MIDDLEWARE TOKEN
import { decodeToken } from '../middleware/manage.token';

const routerSig = Router();



// Exportando el router
export default routerSig;