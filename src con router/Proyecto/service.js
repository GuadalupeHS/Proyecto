const express = require("express");
const CookieParser = require('cookie-parser'); //Para parsear las cookies y leerlas en los request
// const MongoClient = require("mongodb").MongoClient;
const BodyParser =require('body-parser');
const app = express();
const cors =require ('cors');
var Url = require('url-parse');
const Carts = {}; //Variable servidor temporal de sesiones

app.use(BodyParser.urlencoded({
    extended:true
}));
app.use(CookieParser()); //Leer cookies a nivel servidor
app.use(BodyParser.json());

//Modificar el CORS para hacer que el servicio solo funcione con nuestra app (Evitar que servicios externos consuman esta app de carrito)
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:4200'
}));

//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WonderPet', {
    useNewUrlParser: true, 
    useUnifiedTopology:true
}, ( error )=>{
    if( error )
    {
        console.log( 'Error al conectarse a la base de datos');
        console.log( error );
    }
    else
    {
        console.log( 'Se ha conectado a la base de datos satisfactoriamente');
        console.log ( 'Conectado en el server: '+ mongoose.connection.host);
        console.log( 'Conectado en el puerto: ' + mongoose.connection.port);
    }
}
);

var  endpointCuenta = require ('./Routers/Cuenta');
app.use('/cuenta', endpointCuenta);

var  endpointProducto = require ('./Routers/Producto');
app.use('/producto', endpointProducto);

var endpointPedido = require ('./Routers/Pedido');
app.use('/pedido', endpointPedido);

/*var  endpointProducto = require ('./Routers/Carrito');
app.use('/cart', endpointProducto);*/
app.use( '/cart/generate', (req, res )=>{
    var cartID = '';
    //Si no existe la sesión del carrito, generar uno nuevo
    if( !req.cookies['cartID'] )
    {
        var randomSeed = new Date();
        cartID = randomSeed.getDay() + '-' + randomSeed.getUTCMilliseconds();
        res.cookie( 'cartID', cartID , { maxAge: 99999999, httpOnly: false });
        Carts[cartID] = { products: [], price: 0 };
    }
    //Si ya existe, buscar el carrito de esa sesión
    else
    {
        cartID = req.cookies['cartID'] + '';
    }

    //Enviar el carrito en el estado en el que se quedó la última vez (O nuevo, en su caso)
    res.send( Carts[cartID] );
});

app.use( '/cart/add', (req, res )=>{
    var cartID = '';
    var parameters = req.query;
    //Si no existe la sesión del carrito, generar uno nuevo
    if( !req.cookies['cartID'] )
    {
        var randomSeed = new Date();
        cartID = randomSeed.getDay() + '-' + randomSeed.getUTCMilliseconds();
        res.cookie( 'cartID', cartID , { maxAge: 99999999, httpOnly: false });
        Carts[cartID] = { products: [], price: 0 };
    }
    //Si ya existe, buscar el carrito de esa sesión
    else
    {
        cartID = req.cookies['cartID'] + '';
        Carts[cartID].products.push(parameters.id);
    }

    //Enviar el carrito en el estado en el que se quedó la última vez (O nuevo, en su caso)
    res.send( Carts[cartID] );
});


/*
var  endpointStudent = require ('./Routers/Student');
app.use('/student', endpointStudent);

var  endpointTeacher = require ('./Routers/Teacher');
app.use('/teacher', endpointTeacher);
*/
app.listen(777);