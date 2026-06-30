import express from "express";
import usuarioController from "../controladores/usuarioController.mjs";
import verificarToken from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/registro", usuarioController.registrar);
router.post("/login", usuarioController.login);
router.get("/perfil", verificarToken, (req, res) => {

    res.json({

        mensaje: "Bienvenido",

        usuario: req.usuario

    });

});

export default router;