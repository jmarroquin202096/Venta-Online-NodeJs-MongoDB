const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre : String,
    email : String,
    password : String,
    rol : String,
    carrito: [{
        nombreProducto: String,
        cantidad: Number,
        precio: Number
        } ],
        subTotal : Number,
        total: Number
});

module.exports = mongoose.model('Usuario', usuarioSchema);
