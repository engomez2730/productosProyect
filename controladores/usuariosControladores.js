const usuarioSchema = require('../modals/usuarios')
const sharp = require('sharp')
const multer = require('multer')
const storage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error("Solo puede subir Imagenes"))
    }
}

const upload = multer({
    fileFilter: multerFilter,
    storage: storage,
})

exports.subirImagen = upload.single('imagen')

exports.ajustarFoto = async (req, res, next) => {
    console.log(req.file)
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)

    await sharp(req.file.buffer)
        .resize(400, 400)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/usuarios/${filename}`)
    next()
}



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

exports.verUsuario = async (req, res, next) => {

    try {
        const usuarios = await usuarioSchema.findById(req.params.id)
        res.status(201).json({
            status: 'success',
            data: usuarios
        })
    } catch (err) {
        res.status(501).json({
            status: 'error',
            mensaje: err.message,
        })
    }

}

exports.editarUsuario = async (req, res, next) => {
    try {
        const usuarios = await usuarioSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status: 'success',
            data: usuarios
        })
    } catch (err) {
        res.status(501).json({
            status: 'error',
            mensaje: err.message,
        })
    }

}