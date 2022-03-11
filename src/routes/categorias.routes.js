const express = require('express');
const controllerCategoria = require('../controller/categorias.controller');

const md_autentificacion = require('../middlewares/autentificacion');
const md_role = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarCategoria', [md_autentificacion.Auth, md_role.verAdmin], controllerCategoria.agregarCategoria);
api.put('/editarCategoria/:idCategoria', [md_autentificacion.Auth, md_role.verAdmin], controllerCategoria.editarCategoria);
api.delete('/eliminarCategoria/:idCategoria', [md_autentificacion.Auth, md_role.verAdmin], controllerCategoria.eliminarCategoria);
api.get('/buscarCategoria', [md_autentificacion.Auth, md_role.verAdmin], controllerCategoria.visualizarCategorias);

module.exports = api;