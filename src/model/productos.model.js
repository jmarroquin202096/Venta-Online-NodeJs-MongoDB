const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: 'String',
    precio: 'Number',
    cantidad: 'Number',
    idCategoria: {type: Schema.Tupes.ObjectId, ref: 'Categorias'}
}); 

module.exports = ('Productos', productoSchema);