const Facturas = require('../model/facturas.model');
const Carritos = require('../model/carrito.model');
const Productos = require('../model/productos.model');

function agregarFactura(req, res) {
    var parametros = req.body;
    var idCarrito = req.params.idCarrito;
    var idProducto = req.params.idProducto;

    Carritos.findById(idCarrito, (err, carritoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error al Encontrar Carrito" });
        if (!carritoEncontrado) {
            Productos.findById(idProducto, (err, productoEncontrado) => {
                if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
                if (!productoEncontrado) {
                    const modelFactura = new Facturas();
                    if (parametros.nombre && parametros.nit) {
                        modelFactura.nombre = parametros.nombre;
                        modelFactura.nit = parametros.nit;
                        modelFactura.idCarrito = parametros.idCarrito;
                        modelFactura.idProducto = parametros.idProducto;

                        for (i = 1; i <= productoEncontrado.length; i++) {
                            for(j = 1; i = carritoEncontrado.length; j++) {
                               modelFactura.subTotal =  productoEncontrado[i].Precio * carritoEncontrado[j].Strock;
                               modelFactura.total = modelFactura.subTotal;
                            }
                            
                        }

                } else {
                    return res.status(500).send({ mensaje: "Tine que ingresar Todos lod Datos"});
                }
                }else {
                    if(err) return res.status(500).send({ mensaje: "Error al Encontrar Producto"})
                }
            })

        }
    });

}

module.exports = {
    agregarFactura
}