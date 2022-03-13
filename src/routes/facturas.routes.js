const express = require('express');
const controllerFacturas = require('../controller/factura.controller');

const md_autentificacion = require('../middlewares/autentificacion');
const md_role = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarFactura/:idUsuario', [md_autentificacion.Auth, md_role.verAdmin], controllerFacturas.agregarFactura);

module.exports = api;