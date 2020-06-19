import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/*function getItems(carrito){

}*/

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { 

    router.events.subscribe((val) => {

      console.log("Running")
      var cookies = this.GetCookies();
      console.log(cookies);
        if(!cookies['UserID']){
          console.log("Nel");
          return(null);
        }

        this.session.valid = true;

        var self = this;

        $.get({
          url: 'http://localhost:777/cuenta/' + cookies['UserID'],
          xhrFields: {
            withCredentials: true
          },
          success: function (res) {
            self.user = res;
            console.log(self.user);
          }
        });
    });
  }

  ruta;
  busqueda = {
    nombre: ''
  };

  // user = {};
  user={
    "usuario":'',
    "email":'',
    "nombre":'',
    "apellidoPaterno":'',
    "apellidoMaterno":'',
    "calle":'',
    "numExterior":'',
    "numInterior":'',
    "colonia":'',
    "codigoPostal":'',
    "municipio":'',
    "estado":'',
    "pais":'',
    "telefono":'',
    "password":''
  }

  CurrentView;
  navCart = [];
  
  session = {
    valid: false,
    user: ''
  };

  GetCookies = function()
  {
    var cookies = document.cookie.split('; ');
    console.log(cookies);
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
  }

  logOut = function(){
    
    console.log("logging out")
  
      var self = this;
      $.ajax({
        method: 'get',
        xhrFields: {
          withCredentials: true
        },
        url: 'http://localhost:777/cuenta/logOut',
        success: function (result){
          window.location.reload();
        },
        error: function (){
          console.log("Error")
        }
      });
  }
  
}
