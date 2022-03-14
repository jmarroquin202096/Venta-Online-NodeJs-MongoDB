const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema({
    idUsuario: {type: Schema.Types.ObjectId, ref:'Usuarios'},
    nit : String
});

module.exports = mongoose.model('Facturas',  facturaSchema);