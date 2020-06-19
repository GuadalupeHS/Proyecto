var mongoose = require('mongoose');

module.exports = mongoose.model("Provedor", new mongoose.Schema({
    id: Number,
    nombre: String,
    productos: Array,
    pedidos: Array
}), 'Provedores')