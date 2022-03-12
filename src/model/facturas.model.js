const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema({
    nombre: String,
    idUsuario : {type: Schema.Types.ObjectId, ref: 'Usuarios'}, 
    nit : String,
    idProducto : {type: Schema.Types.ObjectId, ref: 'Productos'}, 
    subTotal : Number,
    total : Number
});

module.exports = ('Facturas',  facturaSchema);