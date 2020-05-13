const express = require("express")
const cors = require('cors');

// const MongoClient = require("mongodb").MongoClient;
const BodyParser =require('body-parser');
const app = express();
// const cors =require ('cors');
var Url = require('url-parse');

app.use(BodyParser.urlencoded({
    extended:true
}));
app.use(BodyParser.json());

app.use(cors({
    origin: '*'
}))
// app.use(cors({
//     origin:'*'
// }));

//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WonderPet', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
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
/*
var  endpointStudent = require ('./Routers/Student');
app.use('/student', endpointStudent);

var  endpointTeacher = require ('./Routers/Teacher');
app.use('/teacher', endpointTeacher);
*/
app.listen(777);