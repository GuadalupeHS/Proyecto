var mongoose = require('mongoose');

module.exports = mongoose.model("Pedido", new mongoose.Schema({
    id: Number,
    usuario: String,
    productos: Array,
    total: Number,
    estatus: String,
    calle: String,
    numero_exterior: Number,
    numero_interior:Number,
    colonia: String
    Codigo_postal: Number,
    Municipio: String,
    Estado: String,
    Pais:String,
}), 'Pedido')