import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $: any;

@Component({
  selector: 'seccion',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit{
  
  busqueda = {
    nombre: ''
  };
  
  CurrentView;
  navCart = [];
  
  session = {
    valid: false,
    user: 'skdfjsd'
  };

  total = 99999;

  GetCookies = function()
  {
    var cookies = document.cookie.split(';');
    var array = {};
    for( var i = 0; i < cookies.length; i++ )
    {
      var cookie = cookies[i].split('=');
      array[cookie[0]] = cookie[1];
    }
    return array;
  }

  deleteNavCart = function(index) {
    console.log(index)
    var self = this;

    $.get({
      url: 'http://localhost:777/cart/delete?index='+index,
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        console.log("Nuevos productos");
        self.actualizarCarrito();
      }
    });
    console.log(this.navCart)
  }


  ngOnInit(): void {
    this.actualizarCarrito()
  }

  actualizarCarrito = function() {
    var cookies = this.GetCookies();
    this.navCart = [];
    var self = this;
    $.get({
      url: 'http://localhost:777/cart/generate',
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        console.log("Carrito Servidor")
        console.log(res);
        self.getItems(res);
        //self.verificarOrden(res.products);
      }
   
    });

  }

  getItems = function(carrito){
    var productos = carrito.products;
    var indices = { }
    for(var i = 0; i<productos.length; i++){
      indices[productos[i]] = i;
    } 
    this.total = 0;
    console.log(indices)
    console.log(productos);
    for(var i = 0; i<productos.length; i++){
  
      var self = this;
      console.log(productos[i])
      $.ajax({
        method: 'get',
        url: 'http://localhost:777/producto/'+productos[i],
        success: function (result){
          result.index= indices[result.id];   
          console.log(result);
          console.log("Precio " + result.precio)
          self.total += result.precio;
          self.navCart.push(result);
        },
        error: function (){
          console.log("Error")
        }
      });
  
    }

    console.log(this.navCart);
    
  }

  
}

