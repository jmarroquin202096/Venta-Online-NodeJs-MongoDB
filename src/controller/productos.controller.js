const Productos = require('../model/productos.model');

function agregarProductos(req, res) {
    var parametros = req.body;
    var modelProductos = new Productos();

    if(parametros.nombre && parametros.precio && parametros.cantidad && parametros.idCategoria) {
        modelProductos.nombre = parametros.nombre;
        modelProductos.precio = parametros.precio;
        modelProductos.cantidad = parametros.cantidad;
        modelProductos.idCategoria = parametros.idCategoria;

        modelProductos.save((err, productoGuardado) =>{
            if(err) return res.status(500).send({mensaje: "Error en la Petición"});
            if(!productoGuardado) return res.status(500).send({mensaje: "Error al Guardar el Producto"});

            return res.status(200).send({categoria: categoriaGuardada});
        });
    }
}

function editarProductos(req, res){
    var parametros = req.body;
    var productoId = req.params.idProducto;

    Productos.findByIdAndUpdate(productoId, parametros, {new: true}, (err, productoEditado) => {
        if(err) return res.status(500).send({mensaje: "Error en la Petición", error: err});
        if(!productoEditado) return res.status(500).send({mensaje: "Error al Editar Producto"});

        return res.status(200).send({producto: productoEditado});
    });
}

function eliminarProductos(req, res){
    var productoId = req.params.idProducto;

    Productos.findByIdAndDelete(productoId, (err, productoEliminado) => {
        if(err) return res.status(500).send({mensaje: "Error en la Petición"});
        if(!productoEliminado) return res.status(500).send({mensaje: "Error al Eliminar Producto"});

        return res.status(200).send({producto : productoEliminado});
    });
}

function visualiarProducto(req, res) {
    Productos.find({}, (err, productoEncontrado) => {
        if(err) return res.status(500).send({mensaje: "Error en la Petición"});
        if(!productoEncontrado) return res.status(500).send({mensaje: "Error al Encontrar los Productos"});

        return res.status(200).send({producto : productoEncontrado});
    });
}

function buscarProductosporNombre(req, res) {
    var nombreProducto = req.parmas.nombreProducto;

    Productos.findOne({nombre: nombreProducto}, (err, productoEncontrado) => {
        if(err) return res.status(500).send({mensaje: "Error en la Petición"});
        if(!productoEncontrado) return res.status(500).send({mensaje: "Error al Encontrar el Producto"});

        return res.status(200).send({producto: productoEncontrado});

    });
}

module.exports = {
    agregarProductos, 
    editarProductos,
    eliminarProductos,
    visualiarProducto,
    buscarProductosporNombre
}