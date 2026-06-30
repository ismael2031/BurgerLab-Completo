import bcrypt from "bcrypt";
import usuarioModel from "../modelos/usuarioModel.mjs";
import jwt from "jsonwebtoken";

const registrar = async(req,res)=>{

    try{

        const {nombre,email,password}=req.body;

        const passwordHash=await bcrypt.hash(password,10);

        const usuario=await usuarioModel.crearUsuario(

            nombre,
            email,
            passwordHash

        );

        const { password: _, ...usuarioSinPassword } = usuario;

         res.status(201).json(usuarioSinPassword);

    } catch (error) {

    console.error(error);

    res.status(500).json({
        mensaje: error.message,
        detalle: error
    });

}

};
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        const coincide = await bcrypt.compare(password, usuario.password);

        if (!coincide) {

            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });

        }

        const token = jwt.sign(

            {
                id: usuario.id,
                email: usuario.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );

        res.cookie("token", token, {

            httpOnly: true,
            maxAge: 3600000

        });

        res.json({

            mensaje: "Login correcto",
            token

        });

    } catch (error) {

    console.log("ERROR COMPLETO:");
    console.log(error);

    res.status(500).json({
        mensaje: error.message,
        codigo: error.code,
        detalle: error.detail
    });

}

};

export default {

    registrar,
    login

};