import { Component, OnInit } from '@angular/core';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

/*function getItems(carrito){

}*/

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  busqueda = {
    nombre: ''
  };
  
  CurrentView;
  navCart = [];
  
  session = {
    valid: false,
    user: 'skdfjsd'
  };

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
    console.log("Eliminado: " + this.navCart.splice(index, 1).toString()); 
    var self = this;

    $.get({
      url: 'http://localhost:777/cart/delete?index='+index,
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        console.log("Nuevos productos");
        console.log(res.products);
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
          console.log(result)
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
