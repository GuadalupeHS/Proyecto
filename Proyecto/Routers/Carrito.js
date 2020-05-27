const express = require("express");
const router = express.Router();
const Carts = {}; //Variable servidor temporal de sesiones
const CookieParser = require('cookie-parser');
app.use(CookieParser()); //Leer cookies a nivel servidor

router.get('/generate', async (req, res)=>{
   
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

router.post('/add', async (req, res)=>{
    
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
        Carts[cartID].products.push(parameter.id);
    }
    
    //Enviar el carrito en el estado en el que se quedó la última vez (O nuevo, en su caso)
    res.send( Carts[cartID] );

});

module.exports = router;