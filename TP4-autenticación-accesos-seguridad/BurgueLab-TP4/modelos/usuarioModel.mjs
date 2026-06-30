import conexion from "../configuracion/conexion.mjs";

const crearUsuario = async(nombre,email,password)=>{

    const consulta=`
        INSERT INTO usuarios(nombre,email,password)
        VALUES($1,$2,$3)
        RETURNING *;
    `;

    const valores=[nombre,email,password];

    const resultado=await conexion.query(consulta,valores);

    return resultado.rows[0];

};
const buscarPorEmail = async (email) => {

    const consulta = `
        SELECT * FROM usuarios
        WHERE email = $1;
    `;

    const resultado = await conexion.query(consulta, [email]);

    return resultado.rows[0];

};

export default {

    crearUsuario,
    buscarPorEmail

};