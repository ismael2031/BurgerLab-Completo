import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import conexion from "./configuracion/conexion.mjs";
import rutasUsuarios from "./rutas/usuarioRoutes.mjs";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

conexion.query("SELECT NOW()")
.then(() => {

    console.log("✅ Base de datos conectada");

})
.catch((error)=>{

    console.log(error.message);

});

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use("/usuarios", rutasUsuarios);

app.listen(PORT,()=>{

    console.log(`Servidor iniciado en http://localhost:${PORT}`);

});