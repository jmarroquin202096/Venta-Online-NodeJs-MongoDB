const express = require('express');
const controllerCarrito = require('../controller/carrito.controller');

const md_autentificacion = require('../middlewares/autentificacion');
const md_role = require('../middlewares/roles');

const api = express.Router();

api.post('/carrito/:idUser', [md_autentificacion.Auth, md_role.verCliente], controllerCarrito.carrito);

module.exports =  api;