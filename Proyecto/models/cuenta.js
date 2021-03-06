var mongoose =require ('mongoose');

module.exports = 
mongoose.model( 'Cuenta', new mongoose.Schema({
    usuario: String,
    nombre: String,
    id: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    password: String,
    pedidos: Array,
    carrito: Array,
    calle: String,
    numExterior: Number,
    numInterior: Number,
    colonia: String,
    codigoPostal: Number,
    municipio: String,
    estado: String,
    pais: String,
    telefono: Number,
    email:String,
    creditcard: String,
    numTarjeta: Number,
    fechaExp: String,
    cvv: Number,
    idProveedor: String,
    verificado: Boolean  //or null
}), 'Cuentas');