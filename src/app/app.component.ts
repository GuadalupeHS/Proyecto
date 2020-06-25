import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  CurrentView;
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
        console.log(res);

      }

      
    });

    /*this.Cart.products.push({});
    */
  }
}
