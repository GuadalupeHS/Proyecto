const express = require("express");
const router = express.Router();

var Productos = require('../models/producto');
const Utils =require('../Utils/utils')

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

router.post('/:id', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.id =parseInt(required.id);
    var encontrados = await Productos.findOne(filter);
    if( encontrados)
    {
        res.send( {error:'Este producto ya existe con el id: ' + required.id + ' Esta dado de alta a nombre: ' + encontrados.nombre});
        return;
    } 
    var producto = req.body;
    producto.id = filter.id;
    if(!producto.nombre || !producto.seccion || !producto.categoria || !producto.precio || !producto.descripcion)
    {
        res.send("Debes cumplir con las características minimas de un alumno");
        return;
    }
    // var insertado = await Productos.insertOne(producto);
    var insertado = await Productos.bulkWrite([{
        insertOne:{document :{id:req.body.id, nombre: req.body.nombre, precio: req.body.precio, imagenLink:req.body.imagenLink, descripcion:req.body.descripcion,
             seccion:req.body.seccion, categoria:req.body.categoria, para: req.body.para, inventario:req.body.inventario}}

    }]);
 
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
    var producto = req.body;
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