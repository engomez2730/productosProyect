const mongoose = require('mongoose');


const ProductoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date(),
        required: true,
    },
    cantidadRestantes: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
    },
    imagenes: [String],
    descripcion: {
        type: String,
        required: true,
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const Producto = mongoose.model('Producto', ProductoSchema)

module.exports = Producto