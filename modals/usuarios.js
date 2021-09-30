const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, "El usuario debe tener un Nombre"]
    },
    correo: {
        type: String,
        unique: true,
        require: [true, "El usuario debe tener un correo"],
        lowercase: true,
        validate: validator.isEmail
    },
    imagen: {
        type: String,
    },
    contrasena: {
        type: String,
        require: [true, "El usuario debe tener una contrasena"],
        minlength: 8
    },
    confirmarContrasena: {
        type: String,
        require: [true, "El usuario debe tener una confirmacion de contraseña"],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "No son igules"
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    rol: {
        type: String,
        default: "usuario",
        enum: {
            values: ['usuario', 'admin']
        }
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) {
        return next();
    }
    this.contrasena = await bcrypt.hash(this.contrasena, 12)
    this.confirmarContrasena = undefined
    next()
})

usuarioSchema.methods.compararContrasena = async function (pruebaPassword, originalPassword) {
    return await bcrypt.compare(pruebaPassword, originalPassword)
}


const usuarioModel = mongoose.model('Usuario', usuarioSchema)



module.exports = usuarioModel