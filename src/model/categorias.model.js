const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    nombre : "nombre"
});

module.exports = ("Categorias", categoriasSchema);