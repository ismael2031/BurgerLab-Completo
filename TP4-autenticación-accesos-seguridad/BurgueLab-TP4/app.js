require("dotenv").config();

const express = require("express");

const pool = require("./configuracion/conexion.mjs");

const usuarioRoutes = require("./rutas/usuarioRoutes.mjs");

const app = express();

app.use(express.json());

app.use("/api", usuarioRoutes);

pool.connect()
.then(() => console.log("✅ Base conectada"))
.catch(err => console.log(err));

module.exports = app;




