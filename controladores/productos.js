const ProductoModal = require('../modals/productos')

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
    console.log(ProductoModal.verUsuarios)
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