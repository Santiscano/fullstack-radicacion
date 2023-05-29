import { Router } from 'express';

import { eControlOperativo } from '../controllers/eControl/eControl.controller';

// MIDDLEWARE TOKEN
import { decodeToken } from '../middleware/manage.token';

const routerEControl = Router();

routerEControl.post('/eControlOperativo', eControlOperativo);

// Exportando el router
export default routerEControl;