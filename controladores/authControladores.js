const { promisify } = require('util')
const usuarioModel = require('../modals/usuarios')
const jwt = require('jsonwebtoken')



exports.crearUsuario = async (req, res, next) => {
    try {
        const usuario = await usuarioModel.create(req.body)
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        })

        const cookieOptions = {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
        res.cookie('jwt', token, cookieOptions)


        res.status(201).json({
            status: 'success',
            token
        })
    } catch (err) {
        res.status(501).json({
            status: 'error',
            mensaje: err.message
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { correo } = req.body
        const { contrasena } = req.body
        //Ensuring user insert pass and email
        if (!correo || !contrasena) {
            throw new Error('Tiene que insertar contrasena y correo');
        }
        const usuario = await usuarioModel.findOne({ correo }).select('+contrasena')

        let token;
        //Validating the password
        if (await usuario.compararContrasena(contrasena, usuario.contrasena)) {
            token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            })
        }
        req.usuario = usuario
        res.status(201).json({
            status: 'success',
            token
        })

    } catch (err) {
        res.status(501).json({
            status: 'error',
            mensaje: err.message
        })
    }
}

exports.protegerRutas = async (req, res, next) => {

    try {
        //Recibir Token
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new Error('Debe loguearse para ver esto')
        }
        //Validar Token
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        //Verificar que el usuario aun exista. 
        const freshUser = await usuarioModel.findById(decode.id)
        if (!freshUser) {
            throw new Error('Este usuario ya no existe')
        }
        req.usuario = freshUser
        next()
    } catch (err) {
        res.status(500).json({
            status: "error",
            mensaje: err.message
        })
    }

}

exports.verRol = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.usuario.rol)) {
                throw new Error('No tienes permiso para ver esto')
            }
            next()
        } catch (err) {
            res.status(500).json({
                status: "error",
                mensaje: err.message
            })
        }
    };
};