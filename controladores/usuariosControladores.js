const usuarioSchema = require('../modals/usuarios')

exports.verUsuarios = async (req, res, next) => {
    try {
        console.log(req.usuario)
        const usuarios = await usuarioSchema.find({})
        res.status(201).json({
            status: 'success',
            data: {
                usuarios
            }
        })
    } catch (err) {
        res.status(501).json({
            status: 'error',
            mensaje: err.message,
        })
    }

}

exports.eliminarUsuarios = async (req, res, next) => {

    try {
        const usuarios = await usuarioSchema.deleteMany({})

        res.status(201).json({
            status: 'success',
        })
    } catch (err) {
        res.status(501).json({
            status: 'error',
            mensaje: err.message,
        })
    }

}