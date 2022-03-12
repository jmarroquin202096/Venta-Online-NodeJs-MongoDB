const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    cantidad: Number,
    idCategoria: {type: Schema.Types.ObjectId, ref: 'Categorias'}
}); 

module.exports = ('Productos', productoSchema);