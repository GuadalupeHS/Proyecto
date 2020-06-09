const express = require("express");
const router = express.Router();


var Cuentas = require('../models/cuenta');
const Utils =require('../Utils/utils');



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

    filter.email = params.email;
    var encontradosAux = await Cuentas.findOne(filter);
    if( encontradosAux)
    {
        res.send( {error:'Esta correo ya está registrado '});
        return;
    } 

    if(!params.email && !params.usuario && !params.nombre && !params.apellidoPaterno && !params.apellidoMaterno )
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

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
         user: 'wonderpet.shop2020@gmail.com',
         pass: 'Wonderpet2020'
         }
    });

    var mailOptions = {
        from: 'wonderpet.shop2020@gmail.com',
        to: params.email,
        subject: 'Verificación WonderPet',
        // text: 'That was easy!'
        html: '<html>'+  '<head> <style> html, body{margin: 0; padding: 0; width: 100%; height: 100%;} h1{color:blue; text-align: center; } img{width:20rem;  height:100%; position:relative; text-align: center; } p{color:purple; text-align: center;  } div{ width: auto; height: 7rem; text-align: center; background-color: lightblue;  position: absolute;} </style></head>'+ 
        '<body>' +'<div>' + '<img src="https://www.wonderpet.ca/images/wonderpet.png" ></img>'+ '<h1>WELCOME</h1>'+'<p>'+ params.nombre + '</p>' + '<p>Thank you for joining to WonderPet.</p>'+ '</div>'+'</body>' +'</html>' 
    
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.end();
});


router.get('/login',async (req, res) =>{

    var params = req.query;
    var filter = {};
    filter.email = params.email;
    var encontrados = await Cuentas.findOne(filter);
    if( encontrados)
    {
        res.send( {error:'Esta cuenta ya existe con el correo: ' + params.email + ' Esta dado de alta a nombre: ' + encontrados.nombre});
        return;
    } 

    if(!params.email && !params.password)
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
router.put('/info', async (req, res)=>{
    var required = req.query;
    var filter = {};
    filter.usuario =required.usuario;
    // console.log(req);
    console.log(filter.usuario)
    var encontrados = await Cuentas.findOne(filter);
    if( !encontrados)
    {
        res.send( {error:'Esta cuenta no existe'});
        return;
    }
    // var insertado = await Cuentas.bulkWrite([{
    //     updateOne:{document :{usuario:req.body.usuario, email: req.body.email, nombre: req.body.nombre, apellidoPaterno:req.body.apellidoPaterno, apellidoMaterno:req.body.apellidoMaterno,
    //          calle:req.body.calle, numExterior:req.body.numExterior, numInterior: req.body.numInterior, colonia:req.body.colonia,
    //         codigoPostal:req.body.codigoPostal, municipio:req.body.municipio, estado:req.body.estado, pais:req.body.pais}}

    // }]);
    var cuenta = req.query;
    cuenta.usuario = filter.usuario;
    var insertado = await Cuentas.updateOne(filter, {$set: cuenta});
    if( insertado)
    {
        res.send("Se actualizo correctamente ")
    }
    else
    {
        res.send("Error")
    }
    res.end();

});
router.delete('/:usuario', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.usuario =required.usuario;
    var encontrados = await Cuentas.findOne(filter);
    if( !encontrados)
    {
        res.send( {error:"Esta cuenta no existe"});
        return;
    } 
    
    var insertado = await Cuentas.deleteOne(filter);
    if( insertado)
    {
        res.send("Se elimino correctamente ")
    }
    else
    {
        res.send("Error")
    }
    res.end();

});

module.exports = router;