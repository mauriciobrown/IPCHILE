const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {

    const { nombre, correo, contrasena } = req.body; 
    const hashedPass = await bcrypt.hash(contrasena, 10);
    // La base de datos espera 'contrasena' sin tilde
    await db.query('CALL registrar_usuario(?, ?, ?)', [nombre, correo, hashedPass]);
    res.send({ mensaje: 'Usuario registrado' });
};

exports.login = async (req, res) => {

    const { correo, contrasena } = req.body; 

    try {
        const [rows] = await db.query('CALL obtener_usuario_por_correo(?)', [correo]);
        const usuario = rows[0][0];

        if (!usuario) {
            return res.status(401).send({ error: 'Usuario no existe' });
        }

        const valido = await bcrypt.compare(contrasena, usuario.contrasena); 
        if (!valido) {
            return res.status(401).send({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });

    } catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).send({ error: 'Error interno del servidor al iniciar sesión' });
    }
};