import { Router } from 'express';

import { simplisticsPortafolio } from '../controllers/simplistics/simplistics_api.controller';


const routerSimplistics = Router();

// INFORMACIÓN PERSONAL
routerSimplistics.get('/simplisticsPortafolio/:tipoDoc/:pag', simplisticsPortafolio);

// Exportando el router
export default routerSimplistics;