const express = require('express');
const controllerProducto = require('../controller/productos.controller');

const md_autentificacion = require('../middlewares/autentificacion');
const md_role = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarProductos', [md_autentificacion.Auth, md_role.verAdmin],controllerProducto.agregarProductos);
api.put('/editarProductos/:idProducto', [md_autentificacion.Auth, md_role.verAdmin], controllerProducto.editarProductos);
api.delete('/eliminarProductos/:idProducto', [md_autentificacion.Auth, md_role.verAdmin], controllerProducto.eliminarProductos);
api.get('/buscarProducto', [md_autentificacion.Auth, md_role.verAdmin], controllerProducto.visualiarProducto);
api.get('/buscarProductoporNombre', md_autentificacion.Auth, controllerProducto.buscarProductosporNombre);
api.get('/productosAgotados', md_autentificacion.Auth, controllerProducto.productoAgotados);

module.exports = api;