import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import https from 'https';
import fs from 'fs';
import router from './routes/index.routes';
import routerSig from './routes/sig.routes';
import routerEControl from './routes/eControl.routes';
import humanManagement from "./routes/humanManagement.routes";   
import routerSimplistics from "./routes/simplistics.routes";   
import bodyParser from 'body-parser';

const app = express();

// RUTAS SSL
// const privateKey = fs.readFileSync(`${process.env.SSL_PRIVATE_KEY}`, 'utf8')
// const certificate  = fs.readFileSync(`${process.env.SSL_CERTIFICATE}`, 'utf8')

// const credentials = {
//     key: privateKey,
//     cert: certificate
// };

// const httpsServer = https.createServer(credentials, app);

// DOCUMENTACIÓN SWAGGER 
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de Digitalización EnviExpress',
            description: 'Documentación de la API del DEMO DIGITALIZACIÓN ENVIEXPRESS, creada en Node.JS y TypeScript, con bases de datos en MySQL',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${process.env.LOCAL_PORT}/`,
                description: "Local"
            },
            {
                url: `https://digital-enviexpress-typescript.herokuapp.com/`,
                description: "Servidor"
            }
        ],
    },
    apis: ['./dist/docs/*.js']
};


// MIDDELWARE
// app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Configurar body-parser
app.use(bodyParser.urlencoded({ limit: 'Infinity', extended: true }));
app.use(bodyParser.json({ limit: 'Infinity' }));

// ROUTES
app.use('/', router)

// VERIFICACIÓN BACKEND PRODUCCIÓN
app.use("/api/", (req, res, next) => {
    res.send("Backend Digitalización EnviExpress Funcionando con Éxito");
});

// PUERTO DEL SERVIDOR LOCAL
app.set("port", process.env.LOCAL_PORT || 3000);

// ROUTES
app.use('/', router);
app.use('/sig/', routerSig);
app.use('/eControl/', routerEControl);
router.use('/gh/', humanManagement);

// SIMPLISTICS ROUTES
router.use('/luci/', routerSimplistics);   

// SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))

// CONEXIÓN FRONTEND
// app.use(express.static(path.join(__dirname, '../client/dist')))
// app.get("*", (req, res)=>{
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'))
// });

// INICIAR EL SERVIDOR http://
app.listen(app.get("port"), () => {
    console.log(`Server started at ${process.env.URL_LOCAL}:${app.get("port")}`);
});

// INICIAR EL SERVIDOR https://
// httpsServer.listen( 443, () => {
//     console.log(`Server started at ${process.env.URL_SERVER}:443`);
// });