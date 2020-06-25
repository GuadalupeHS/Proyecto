const express = require("express");
const router = express.Router();

const Utils =require('../Utils/utils')



router.post('/', async (req, res)=>{
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