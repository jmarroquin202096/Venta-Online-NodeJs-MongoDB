const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
    idProducto : {type: Schema.Types.ObjectId, ref:'Productos'},
    idUsuario : {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    cantidad: Number
});

module.exports = mongoose.model('Carritos', carritoSchema);