var mongoose = require('mongoose');

module.exports = mongoose.model("Pedido", new mongoose.Schema({
    idPedido: String,
    usuario: String,
    productos: Array,
    total: Number,
    estatus: String,
    calle: String,
    numExterior: Number,
    numInterior:Number,
    colonia: String,
    codigo_postal: Number,
    municipio: String,
    estado: String,
    pais:String,
}), 'Pedido')