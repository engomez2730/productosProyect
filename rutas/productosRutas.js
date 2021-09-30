const express = require('express');
const Router = express.Router();
const productosContraloders = require('../controladores/productos')

Router.route('/')
    .get(productosContraloders.verProductos)
    .post(productosContraloders.crearProducto)

Router.route('/:id')
    .get(productosContraloders.verProducto)
    .delete(productosContraloders.eliminarProducto)

module.exports = Router;