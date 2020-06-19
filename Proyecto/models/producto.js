var mongoose = require('mongoose');

module.exports = mongoose.model("Producto", new mongoose.Schema({
    id: Number,
    nombre: String,
    precio: Number,
    imagenLink: String,
    descripcion: String,
    seccion: String,
    categoria: String,
    para: String,
    inventario: String
}), 'Productos')