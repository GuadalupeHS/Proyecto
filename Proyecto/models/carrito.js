var mongoose = require('mongoose');

module.exports = mongoose.model("Carrito", new mongoose.Schema({
    id: Number,
    productos: Array,
}), 'Carrito')