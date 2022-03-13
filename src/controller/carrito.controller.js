/*const Carritos = require('../model/carrito.model');
const Productos = require('../model/productos.model');*/
/*
function carrito(req, res) {
    var parametros = req.body;
    var idProducto = req.params.idProducto;
    var idUser = req.user.sub;

    if(parametros.cantidad) {
      Productos.findOne({ productos: { $elemMatch: { "_id" : idProducto } } }, {"productos.$": 1}, (err, productoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error al Encontrar Producto" });
        if(productoEncontrado) {
            if(parametros.cantidad  > productoEncontrado.cantidad) {
                return res.status(500).send({message: "La cantidad del Producto es mayor a la que se encuentra en Bodega"});
            } else {
                Carritos.findByIdAndUpdate({idUsuario: idUser}, {$push : {productos: productoEncontrado._id,  cantidad: parametros.cantidad}}), {new: true}, (err, productoAgregado) => {
                    if(err) return res.status(500).send({ mensaje: "Error en la Petición"});
                    if(!productoAgregado) return res.status(500).send({mensaje: "No se puede Agregar Productos a su Carritos"});

                    return res.status(200).send({producto: productoAgregado});
                });
            }
        } /*else {
        return res.status(500).send({mensaje: "El producto No Existe o se Encuentra Agotado"});
        }*/
      //});
  //  } /*else {
      /*  return res.status(500).send({mensaje: "Debe Ingresar la Cantidad de Producto que desea Llevar"});
    }*/
//}/*/
/*
module.exports = {
    carrito
}*/