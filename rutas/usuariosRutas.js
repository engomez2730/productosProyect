const express = require('express');
const Router = express.Router();
const usuariosControladores = require('../controladores/usuariosControladores');
const authControladores = require('../controladores/authControladores');


Router.route('/')
    .get(/* authControladores.protegerRutas, authControladores.verRol('admin'), */ usuariosControladores.verUsuarios)
    .delete(usuariosControladores.eliminarUsuarios)

Router.route('/:id')
    .get(usuariosControladores.verUsuario)
    .patch(usuariosControladores.subirImagen, usuariosControladores.ajustarFoto, usuariosControladores.editarUsuario)

module.exports = Router;