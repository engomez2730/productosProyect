const express = require('express');
const Router = express.Router();
const usuariosControladores = require('../controladores/usuariosControladores');
const authControladores = require('../controladores/authControladores');


Router.route('/')
    .get(authControladores.protegerRutas, authControladores.verRol('admin'), usuariosControladores.verUsuarios)
    .delete(usuariosControladores.eliminarUsuarios)

module.exports = Router;