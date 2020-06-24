const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './../WonderPet/src/images/catalogo/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() +'-'+ file.originalname);
    }
});
const upload = multer({storage: storage});

var Productos = require('../models/producto');
const Utils =require('../Utils/utils')

router.get('/search/admin', async (req, res) =>{
    var parameters = req.query;

    var encontrados;

    console.log(parameters);
    if(!parameters.id){
        res.send({error: 'Error en su solicitud.'});
    }else{
        var filter ={};
            
        filter.idMarca = { $regex: Utils.ToRegex( parameters.id )};
                
        /*if(!parameters.orden){
            encontrados = await Productos.find(nuevoFiltro).sort({nombre:1}); 
        }else if(parameters.orden == 'nd'){
            encontrados = await Productos.find(nuevoFiltro).sort({nombre:-1}); 
        }else if(parameters.orden == 'pa'){
            encontrados = await Productos.find(nuevoFiltro).sort({precio:1}); 
        }else if(parameters.orden == 'pd'){
            encontrados = await Productos.find(nuevoFiltro).sort({precio:-1}); 
        }
                 
        if( nMax != null ) {
            encontrados = await encontrados.limit( max );
        }*/
        encontrados = await Productos.find(filter).sort({id:1});       
        res.send(encontrados);
    }  
       
    res.end();
})

router.get('/search',async (req, res) =>{
    var parameters = req.query;
    var required = req.params;
    var maximos = {1:199, 200:499, 500:999}

    // res.send({texto:'localhost/search'});
    if( parameters.nombre || parameters.mascota || parameters.departamento || parameters.precios)
        {
            var filter ={};
            var send = []
            
            var minimo = parameters.precios ?  parseInt(parameters.precios): null; 

            var nMax = parameters.nMax ?  parseInt(parameters.nMax): null; 

            if(parameters.nombre)
            {
                filter.nombre = { $regex: Utils.ToRegex( parameters.nombre )};
            }
            if(parameters.mascota)
            {
                filter.seccion= { $regex: Utils.ToRegex( parameters.mascota )};
            }
            if( parameters.departamento )
            {
                filter.categoria = { $regex: Utils.ToRegex(parameters.departamento)} ;
            }
            if( parameters.departamento )
            {
                filter.categoria = { $regex: Utils.ToRegex(parameters.departamento)} ;
            }

            if (minimo){
                if (minimo < 1000){
                    maximo = maximos[minimo]
                    console.log("Maximo: " + maximo);
                    send.push({precio: {$lt: maximo }});
                }
                console.log("Minimo: " + minimo)
                send.push({precio: {$gt: minimo }});
            }
            
            filter ?  send.push(filter) : null; 
            

            var nuevoFiltro = {
                $and: send
            };

            var encontrados;
            
            if(!parameters.orden){
                encontrados = await Productos.find(nuevoFiltro).sort({nombre:1}); 
            }else if(parameters.orden == 'nd'){
                encontrados = await Productos.find(nuevoFiltro).sort({nombre:-1}); 
            }else if(parameters.orden == 'pa'){
                encontrados = await Productos.find(nuevoFiltro).sort({precio:1}); 
            }else if(parameters.orden == 'pd'){
                encontrados = await Productos.find(nuevoFiltro).sort({precio:-1}); 
            }
            
            
            if( nMax != null )
            {
                encontrados = await encontrados.limit( max );
            }
            
            
            res.send(encontrados);
        
        }
        else{
            res.send({error: 'Necesita especificar por lo menos el nombre, seccion o categoria'});
        }
    res.end();
});
//http://localhost:777/producto/search?seccion=perros&categoria=limpieza


router.get('/all', async (req, res)=>{
    var parameters = req.query;
    var encontrados;

    if(!parameters.orden){
        encontrados = await Productos.find().sort({nombre:1}); 
    }else if(parameters.orden == 'nd'){
        encontrados = await Productos.find().sort({nombre:-1}); 
    }else if(parameters.orden == 'pa'){
        encontrados = await Productos.find().sort({precio:1}); 
    }else if(parameters.orden == 'pd'){
        encontrados = await Productos.find().sort({precio:-1}); 
    }

    res.send(encontrados);
    res.end();
});

router.get('/:id', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.id = required.id;
    var encontrados = await Productos.findOne(filter);
    res.send(encontrados);
    res.end();
});


router.post('/upload', upload.single('image'), (req, res)=>{
    var url = '../../images/catalogo/'+req.file.filename;
    res.send(url);
    res.end();
});

router.post('/new', async (req, res)=>{
    var params = req.query;

    if(!params.nombre || !params.seccion || !params.categoria 
        || !params.precio || !params.descripcion || !params.imagenLink
        || !params.idMarca)
    {
        console.log(params);
        res.send({error:'Faltan campos al agregar producto'});
        return;
    }
    var encontrados = await Productos.find(); 
    params.id = encontrados.length+1;

    var insertado = await Productos.create(params);

    if(insertado)
    {
        res.send("Se inserto correctamente ")
        var fileContent = "AuxFile";
        var filepath = "./../WonderPet/src/images/catalogo/aux.jpg";
        fs.writeFile(filepath, fileContent, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
        });

        fs.unlink("./../WonderPet/src/images/catalogo/aux.jpg", (err) => {
            if(err){
                console.error(err);
                return;
            }
        });
    }
    else
    {
        res.send({error:'Error al agregar producto'});
    }

    
    res.end();
});

router.put('/upload', upload.single('image'), (req, res)=>{
    var url = '../../images/catalogo/'+req.file.filename;
    res.send(url);
    res.end();
});


router.put('/:id', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.id =parseInt(required.id);
    var encontrados = await Productos.findOne(filter);
    if( !encontrados)
    {
        res.send( {error:'Este producto no existe'});
        return;
    }
    var producto =  req.query;
    producto.id = filter.id;
    var insertado = await Productos.updateOne(filter, {$set: producto});
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

router.delete('/upload', async (req, res)=>{
    var required = req.params;
    var parameters = req.query;

    if(!parameters.link){
        res.send( {error:'Error en su solicitud'});
        return;
    }
    var link = parameters.link.split('/')
    var path = './../WonderPet/src/images/catalogo/' + link[4];

    fs.unlink(path, (err) => {
        if(err){
            console.error(err);
            return;
        }
    });
    console.log("done")
    res.send("Se eliminó correctamente ")

});

router.delete('/:id', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.id =parseInt(required.id);
    var encontrados = await Productos.findOne(filter);
    if( !encontrados)
    {
        res.send( {error:"Este producto no existe"});
        return;
    } 
    var link = encontrados.imagenLink.split('/')
    var path = './../WonderPet/src/images/catalogo/' + link[4];

    fs.unlink(path, (err) => {
        if(err){
            console.error(err);
            return;
        }
    });
    
    var insertado = await Productos.deleteOne(filter);
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