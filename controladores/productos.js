const ProductoModal = require('../modals/productos')
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
    storage: storage,
    fileFilter: multerFilter,
})



exports.subirFoto = upload.array('imagenes', 2)


exports.ajustarFoto = async (req, res, next) => {
    if (!req.files) return next()
    req.body.imagenes = []
    await Promise.all(
        req.files.map(async (file) => {
            const filename = `${Date.now() + '-' + Math.round(Math.random() * 1E9)}.jpeg`
            sharp(file.buffer)
                .resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/img/productos/${filename}`)
            req.body.imagenes.push(filename)
        })
    )
    next()
}

exports.verProductos = async (req, res, next) => {
    try {
        const Producto = await ProductoModal.find({})
        res.status(200).json({
            status: 'success',
            cantidad: Producto.length,
            data: {
                Producto
            }
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            mensaje: err.message
        })
    }
}
exports.crearProducto = async (req, res, next) => {
    try {
        const Producto = await ProductoModal.create(req.body)

        res.status(200).json({
            status: 'success',
            data: {
                Producto
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            data: err.message
        })
    }
}

exports.eliminarProducto = async (req, res, next) => {
    const id = req.params.id
    await ProductoModal.findByIdAndDelete(id)

    res.status(200).json({
        status: 'success',

    })
}
exports.verProducto = async (req, res, next) => {
    const id = req.params.id
    const producto = await ProductoModal.findById(id)

    res.status(200).json({
        status: 'success',
        producto

    })
}


exports.editarProducto = async (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    try {
        const id = req.params.id
        if (!id) throw new Error('No hay un producto con este ID')
        const productoActualizado = await ProductoModal.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                productoActualizado
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            mensaje: err.message,
        })
    }
}