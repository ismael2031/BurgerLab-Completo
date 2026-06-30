import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {

        return res.status(401).json({
            mensaje: "No autorizado"
        });

    }

    try {

        const datos = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = datos;

        next();

    } catch (error) {

        return res.status(403).json({
            mensaje: "Token inválido"
        });

    }

};

export default verificarToken;