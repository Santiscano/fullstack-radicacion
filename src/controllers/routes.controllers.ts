import { Request, Response } from 'express';
import router from '../routes/index.routes';


// Traer las rutas del sistema
export const routerApi = (req: Request, res: Response) => {
    try {
        let rutas: any = []
        let contador = 1;
        router.stack.forEach(element => {
            let metodo = element.route.stack[0].method;
            let ruta =  element.route.path;
            let URL = process.env.LOCAL + element.route.path;
            rutas.push({id: contador, metodo, ruta, URL});
            contador++
        });
        return res.status(200).json({ rutas })
    } catch (error) {
        return res.status(508).json({ message: "Error del servidor para enviar las rutas" })
    };
};
