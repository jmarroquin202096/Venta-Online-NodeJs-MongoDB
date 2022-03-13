const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema({
    nombre: String,
    nit : String,
    idCarrito : {type: Schema.Types.ObjectId, ref:'Carritos'},
    idProducto : {type: Schema.Types.ObjectId, ref:'Productos'},
    subTotal : Number,
    total : Number
});

module.exports = mongoose.model('Facturas',  facturaSchema);