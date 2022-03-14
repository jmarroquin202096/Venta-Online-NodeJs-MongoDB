const Facturas = require('../model/facturas.model');
const Usuarios = require('../model/usuarios.model');
const PDF = require('pdfkit');
const fs = require('fs');

function agregarFactura(req, res) {
    var parametros = req.body;
    var modelFactura = new Facturas();

    if(parametros.nit) {
        modelFactura.idUsuario = req.user.sub;
        modelFactura.nit = parametros.nit;

        modelFactura.save((err, facturaGuardada) => {
            if(err) return res.status(500).send({ mensaje: "Error en la Petición" });
            if(!facturaGuardada) return res.status(500).send({mensaje: "Error al Agregar Factura" });

            return res.status(200).send({factura: facturaGuardada});
        });
    } else {
        return res.status(500).send({ mensaje: "Debe Ingresar los Datos Necesarios"});
    }

}

function visualizarFacturasClientes(req, res) {
    Facturas.find({}, (err, facturaEncontrada) => {
        if(err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if(!facturaEncontrada) return res.status(500).send({ mensaje: "Error al Encontrar Factura" });

        return res.status(200).send({factura: facturaEncontrada});
    });
}

function visualizarFacturasporProductos(req, res) {

}


function productomasVendido(req, res) {
    Facturas.find({idUsuario: {$elemMatch: {carrito: {nombreProducto: {$gte: 1}}}  }}, (err, facturaEncontrada) => {
        if(err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if(!facturaEncontrada) return res.status(500).send({ mensaje: "Error al Encontrar Factura" });

        return res.status(200).send({factura: facturaEncontrada});
    });
}  

function pdfFactura(req, res) {
    var nit = req.params.nit;
    Usuarios.findOne({idUsuario : req.user.sub}, (err, usuaarioEncontrado) =>{
        if(err) return res.status(500).send({mensaje: "Error en la Petición"});
        Facturas.find({nit: nit}, (err, encontrarFactura) =>{
            var doc = new PDF();
            doc.pipe(fs.createWriteStream(__dirname + '/factura.pdf'));
            doc.text("Factura");
            doc.text("Nombre:  " + usuaarioEncontrado.nombre);
            doc.text("NIT:   " +encontrarFactura.nit);
            doc.text(usuaarioEncontrado.carrito);
            doc.text('Sub Total:   ' + usuaarioEncontrado.subTotal);
            doc.text('Total:    ' + usuaarioEncontrado.total);
            doc.text("Firma ______________________________" ) ;

            doc.end();
        })
       

    });
}



module.exports = {
    agregarFactura,
    visualizarFacturasClientes,
    visualizarFacturasporProductos,
    productomasVendido,
    pdfFactura
}