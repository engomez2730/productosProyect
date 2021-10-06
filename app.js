const express = require('express');
const app = express();
const Funciones = require('./help/funciones')
const morgan = require('morgan')
const dotenv = require('dotenv')
const productosRouter = require('./rutas/productosRutas')
const authRouter = require('./rutas/authRuta')
const usuariosRouter = require('./rutas/usuariosRutas')


const cors = require('cors')
app.use(cors());
app.options('*', cors());

//Setting DotEnv to the config file.
dotenv.config({ path: './config.env' })
app.use(express.json({ limit: '10kb' }))
app.use(Funciones.belive)
app.use(cors());
app.options('*', cors());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}


app.use('/api/v1/productos', productosRouter)
app.use('/api/v1/usuarios', usuariosRouter)
app.use('/api/v1/usuarios/auth', authRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'No se encuentra esta direccion'
    })
    next()
})

module.exports = app