var mongoose = require('mongoose');

module.exports = mongoose.model("Pedido", new mongoose.Schema({
    id: String,
    usuario: String,
    productos: Array,
    total: Number,
    estatus: String,
    calle: String,
    numero_exterior: Number,
    numero_interior:Number,
    colonia: String,
    codigo_postal: Number,
    municipio: String,
    estado: String,
    pais:String,
}), 'Pedido')