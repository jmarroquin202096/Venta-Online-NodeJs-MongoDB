const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema({
    idUsuario : {type: Schema.Type.ObjectId, ref: 'Usuarios'}, 
    nit : 'Number',
    idProducto : {type: Schema.Type.ObjectId, ref: 'Productos'}, 
    subTotal : 'Number',
    total : 'Number'
});

module.exports = ('Facturas',  facturaSchema);