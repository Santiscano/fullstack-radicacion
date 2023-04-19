import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import https from 'https';
import fs from 'fs';
import router from './routes/index.routes'

const app = express();

// const privateKey = fs.readFileSync(`${process.env.SSL_PRIVATE_KEY}`, 'utf8')
// const certificate  = fs.readFileSync(`${process.env.SSL_CERTIFICATE}`, 'utf8')

// const credentials = {
//     key: privateKey,
//     cert: certificate
// };

// const httpsServer = https.createServer(credentials, app);

//Establecer conexión con Swagger 
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
                url: `http://localhost:${process.env.PORT}/`,
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


//Midelware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//verificar si esta en produccion el backend
app.use("/api/", (req, res, next) => {
    res.send("Digitalización EnviExpress");
});

// Rutas del frontend
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});


//routes
app.use('/', router)

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))

//Establecer puerto
app.set("port", process.env.PORT || 3000);

// Iniciar el servidor http://
app.listen(app.get("port"), () => {
    console.log(`Server started at ${process.env.SERVER}:${app.get("port")}`);
});

// Iniciar el servidor https://
// httpsServer.listen( 443, () => {
//     console.log(`Server started at ${process.env.SERVER}:443`);
// });