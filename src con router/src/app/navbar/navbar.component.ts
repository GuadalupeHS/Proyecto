import { Component, OnInit } from '@angular/core';

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
  Cart = {};
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

  ngOnInit(): void {
    var cookies = this.GetCookies();
    var self = this;
    $.get({
      url: 'http://localhost:777/cart/generate',
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        self.getItems(res);
      }
   
    });

  }

  getItems = function(carrito){

    for(var i = 0; i< carrito.products.length; i++){
  
      var self = this;
      console.log(carrito.products[i])
  
      $.ajax({
        method: 'get',
        url: 'http://localhost:777/producto/'+carrito.products[i],
        success: function (result){
          console.log(result);
          self.navCart.push(result);
        },
        error: function (){
          console.log("Error")
        }
      });
  
  
    }

    console.log(this.navCart)
  
  }

  deleteNavCart = function(index) {
    this.navCart.splice(index, index+1); 

    var self = this;

    $.get({
      url: 'http://localhost:777/cart/delete?index='+index,
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        console.log(res);
        console.log(res.products);
      }
    });
    console.log(this.navCart)
  }

}
