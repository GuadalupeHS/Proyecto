const express = require("express");
const router = express.Router();

var Pedido = require('../models/pedido');
const Utils =require('../Utils/utils')

router.get('/search',async (req, res) =>{
    var parameters = req.query;
    var required = req.params;
    // res.send({texto:'localhost/search'});
    if( parameters.id || parameters.usuario || parameters.estatus )
        {
            var filter ={};
            var max =parameters.max ?  parseInt(parameters.max): null; 
            if(parameters.id)
            {
                filter.id = { $regex: Utils.ToRegex( parameters.id )};
            }
            if(parameters.usuario)
            {
                filter.usuario= { $regex: Utils.ToRegex( parameters.usuario )};
            }
            if( parameters.estatus )
            {
                filter.estatus = { $regex: Utils.ToRegex(parameters.estatus)} ;
            }
           

            var encontrados = await Pedido.find(filter).sort({usuario:1}); 
            
            if( max != null )
            {
                encontrados = await encontrados.limit( max );
            }
            
            
            res.send(encontrados);
        
        }
        else{
            res.send({error: 'Necesita especificar por lo menos el id, usuario o estatus'});
        }
    res.end();
});
//http://localhost:777/producto/search?seccion=perros&categoria=limpieza

// router.get('/all', async (req, res)=>{
    
//     var encontrados = await Pedido.find();
//     res.send(encontrados);
//     res.end();
// }); 
router.get('/:id', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.id = required.id;
    var encontrados = await Pedido.findOne(filter);
    res.send(encontrados);
    res.end();
});

router.post('/:usuario', async (req, res)=>{
    var required = req.params;
    var filter = {};
    filter.usuario =required.usuario;
    
    // var generateSafeId = require('generate-safe-id');

 
    var encontrados = await Pedido.findOne(filter);
    if( encontrados)
    {
        res.send( {error:'Este pedido ya existe con el usuario: ' + required.usuario + ' y con el id ' + encontrados.id});
        return;
    } 
    var pedido = req.body;
    // var ID = generateSafeId();
    var shortid = require('shortid');
    ID= shortid.generate();
    pedido.id= ID;
    pedido.usuario = filter.usuario;
    if( !pedido.productos || !pedido.total || !pedido.estatus )
    {
        res.send("Debes cumplir con las características minimas de un pedido");
        return;
    }
    // var insertado = await Productos.insertOne(producto);
    var insertado = await Pedido.bulkWrite([{
        insertOne:{document :{id:req.body.id, usuario: req.body.usuario, productos: req.body.productos, total:req.body.total, estatus:req.body.estatus,
             calle:req.body.calle, numero_exterior:req.body.numero_exterior, numero_interior: req.body.numero_interior, colonia:req.body.colonia,
            codigo_postal:req.body.codigo_postal, municipio:req.body.municipio, estado:req.body.estado, pais:req.body.pais}}

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
    filter.id =required.id;
    var encontrados = await Pedido.findOne(filter);
    if( !encontrados)
    {
        res.send( {error:'Este pedido no existe'});
        return;
    }
    var pedido = req.body;
   pedido.id = filter.id;
    var insertado = await Pedido.updateOne(filter, {$set: pedido});
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
    filter.id =required.id;
    var encontrados = await Pedido.findOne(filter);
    if( !encontrados)
    {
        res.send( {error:"Este pedido no existe"});
        return;
    } 
    
    var insertado = await Pedido.deleteOne(filter);
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