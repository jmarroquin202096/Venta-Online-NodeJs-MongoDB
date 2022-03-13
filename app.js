const express = require('express');
const cors = require('cors');
const app = express();

/*Importaciones*/
const usuarioRoutes = require('./src/routes/usuario.routes');
//const facturasRoutes = require('./src/routes/facturas.routes');
const categoriaRoutes = require('./src/routes/categorias.routes');
const productoRoutes = require('./src/routes/productos.routes');
//const carritoRoutes = require('./src/routes/carrito.routes');


/*Middlewares*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/*Cabecera*/
app.use(cors());

/*Rutas*/
app.use('/api', usuarioRoutes, categoriaRoutes,  productoRoutes);

module.exports = app;