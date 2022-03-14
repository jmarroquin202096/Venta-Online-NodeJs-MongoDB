const express = require('express');
const controllerFacturas = require('../controller/factura.controller');

const md_autentificacion = require('../middlewares/autentificacion');
const md_role = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarFactura', [md_autentificacion.Auth, md_role.verAdmin], controllerFacturas.agregarFactura);
api.get('/buscarFacturas', [md_autentificacion.Auth, md_role.verAdmin], controllerFacturas.visualizarFacturasClientes);
api.get('/buscarFacturasporProducto', [md_autentificacion.Auth, md_role.verAdmin], controllerFacturas.visualizarFacturasporProductos);
api.get('/buscarProductosmasVendidos', [md_autentificacion.Auth], controllerFacturas.productomasVendido);
api.get('/facturaPdf', md_autentificacion.Auth, controllerFacturas.pdfFactura);

module.exports = api;