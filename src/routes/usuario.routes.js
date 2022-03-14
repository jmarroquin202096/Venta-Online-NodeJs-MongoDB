const express = require('express');
const usuasrioController = require('../controller/usuarios.controller');

const md_autentificacion = require('../middlewares/autentificacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/registrar', usuasrioController.registrar);
api.post('/login', usuasrioController.login);
api.put('/editarUsuario/:idUsuario', md_autentificacion.Auth, usuasrioController.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_autentificacion.Auth, usuasrioController.eliminarUsuario);
api.put('/carrito', [md_autentificacion.Auth, md_roles.verCliente], usuasrioController.carrito);

module.exports = api;