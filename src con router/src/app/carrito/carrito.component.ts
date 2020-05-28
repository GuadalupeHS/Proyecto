import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';
// import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;
@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']

})

export class  CarritoComponent implements OnInit {

  Cart = {};

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
        self.Cart = res;
      }
    });

    //this.Cart.products.push({});
    $.post({
      url: 'http://localhost:777/cart/add',
      xhrFields: {
        withCredentials: true
      },
      data: {product: ''},
      success: function (res) {
        self.Cart = res;
      }
    });
  }    
}
