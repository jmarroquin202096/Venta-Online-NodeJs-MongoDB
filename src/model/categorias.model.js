const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    nombre : String
});

module.exports = mongoose.model("Categorias", categoriasSchema);