const express = require('express');
const authControladores = require('../controladores/authControladores');
const Router = express.Router();

Router
    .route('/signup')
    .post(authControladores.crearUsuario)

Router
    .route('/login')
    .post(authControladores.login)

module.exports = Router;