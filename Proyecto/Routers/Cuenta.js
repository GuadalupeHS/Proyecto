const express = require("express");
const router = express.Router();


var Cuentas = require('../models/cuenta');
const Utils =require('../Utils/utils')


router.get('/search',async (req, res) =>{
    var parameters = req.query;
    var required = req.params;
    // res.send({texto:'localhost/search'});
    if( parameters.usuario || parameters.nombre || parameters.municipio )
        {
            var filter ={};
            var max =parameters.max ?  parseInt(parameters.max): null; 
            if(parameters.usuario)
            {
                filter.usuario = { $regex: Utils.ToRegex( parameters.usuario )};
            }
            if(parameters.nombre)
            {
                filter.nombre= { $regex: Utils.ToRegex( parameters.nombre )};
            }
            if( parameters.municipio )
            {
                filter.municipio = { $regex: Utils.ToRegex(parameters.municipio)} ;
            }
           
            //var Codellege = await DataBase.db('Codellege'); //use Codellege -> db
            //var Alumnos= await Codellege.collection('Alumnos'); //db.Alumnos

            var encontrados = await Cuentas.find(filter).sort({nombre:1}); //toArray() //db.Alumnos.find()
            
            if( max != null )
            {
                encontrados = await encontrados.limit( max );
            }
            
            //encontrados = await encontrados.toArray();
            res.send(encontrados);
            //res.write( JSON.stringify( encontrados ));
        }
        else{
            res.send({error: 'Necesita especificar por lo menos el usuario, nombre o municipio'});
        }
    res.end();
});

router.post('/new',async (req, res) =>{

    var params = req.query;
    var filter = {};
    filter.usuario = params.usuario;
    var encontrados = await Cuentas.findOne(filter);
    if( encontrados)
    {
        res.send( {error:'Esta cuenta ya existe con el usuario: ' + params.usuario + ' Esta dado de alta a nombre: ' + encontrados.nombre});
        return;
    } 

    if(!params.usuario && !params.nombre && !params.apellidoPaterno && !params.apellidoMaterno && !params.email)
    {
        res.send("Debes cumplir con las características minimas de una cuenta");
        return;
    }
    
    var insertado = await Cuentas.create(params);
    if( insertado)
    {
        res.send("se inserto correctamente ")
    }
    else
    {
        res.send("Error");
    }
    res.end();
});

router.get('/:usuario', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.usuario = required.usuario;
    var encontrados = await Cuentas.findOne(filter);
    res.send(encontrados);
    res.end();
});

router.post('/:usuario', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.usuario =required.usuario;
    var encontrados = await Cuentas.findOne(filter);
    if( encontrados)
    {
        res.send( {error:'Esta cuenta ya existe con el usuario: ' + required.usuario + ' Esta dado de alta a nombre: ' + encontrados.nombre});
        return;
    } 
    var cuenta = req.body;
    console.log(req);
    cuenta.usuario = filter.usuario;
    if(!cuenta.usuario && !cuenta.nombre && !cuenta.apellidoPaterno && !cuenta.apellidoMaterno)
    {
        res.send("Debes cumplir con las características minimas de una cuenta");
        return;
    }
    var insertado = await Cuentas.create(cuenta);
    if( insertado)
    {
        res.send("se inserto correctamente ")
    }
    else
    {
        res.send("Error");
    }
    res.end();
});


module.exports = router;
