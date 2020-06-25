import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
 const VIEW ={Success: 'Success'}

declare var $:any;

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})


export class PedidosComponent implements OnInit{
    option;
    constructor(private route: ActivatedRoute, private router: Router) { 
      
      router.events.subscribe((val) => {
        this.option = this.route.snapshot.queryParams["option"];
       
       });
    }
  
    CurrentView;
    VIEW=VIEW;
    navCart = [];
  
    
    
    session = {
      valid: false,
      user: 'skdfjsd'
    };
    user={
      "usuario":'',
      "nombre":'',
      "numTarjeta":'',
      "fechaExp":'',
      "cvv":'',
      "calle":'',
      "numExterior":'',
      "numInterior":'',
      "colonia":'',
      "codigoPostal":'',
      "municipio":'',
      "estado":'',
      "pais":'',
      "idPedido":''
    }
    
   
    // ids=[];
    // GetIdPedido=function(){
    //   var params = '';
    //   params += 'usuario=' + this.user.usuario;
  
    //   var self = this;
    //   $.ajax ({
    //     method: 'get',
    //     url: 'http://localhost:777/pedido/user?' + params,
    //     success: function(result){
    //       self.ids=result;
    //       // self.router.navigate(['/perfil'], {queryParams: {option:'DatosP'}});
    //   },
    //   error:function (xhr, ajaxOptions, thrownError){
    //     self.ids=[];
    //     self.isLoadingPedido=false;
    //   }
    //   });
    // }
    
  
    
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
      console.log(cookies);
        if(!cookies['UserID']){
          console.log("Nel");
          return(null);
        }
  
        var self = this;
  
        $.get({
          url: 'http://localhost:777/cuenta/' + cookies['UserID'],
          xhrFields: {
            withCredentials: true
          },
          success: function (res) {
            self.user=res;
  
          },
          error: function (){
            self.router.navigate(['/'], {});
          }
        });
       
      
    }
  
    
  }
  
  
  
  







// export class PedidosComponent implements OnInit{
//   option;
//   constructor(private route: ActivatedRoute, private router: Router) { 
    
//     router.events.subscribe((val) => {
//       this.option = this.route.snapshot.queryParams["option"];
     
//      });
//   }

//   CurrentView;
//   VIEW=VIEW;
//   navCart = [];

  
  
//   session = {
//     valid: false,
//     user: 'skdfjsd'
//   };
//   user={
//     "usuario":'',
//     "nombre":'',
//     "numTarjeta":'',
//     "fechaExp":'',
//     "cvv":'',
//     "calle":'',
//     "numExterior":'',
//     "numInterior":'',
//     "colonia":'',
//     "codigoPostal":'',
//     "municipio":'',
//     "estado":'',
//     "pais":'',
//     "idPedido":''
//   }
  
 
//   // ids=[];
//   // GetIdPedido=function(){
//   //   var params = '';
//   //   params += 'usuario=' + this.user.usuario;

//   //   var self = this;
//   //   $.ajax ({
//   //     method: 'get',
//   //     url: 'http://localhost:777/pedido/user?' + params,
//   //     success: function(result){
//   //       self.ids=result;
//   //       // self.router.navigate(['/perfil'], {queryParams: {option:'DatosP'}});
//   //   },
//   //   error:function (xhr, ajaxOptions, thrownError){
//   //     self.ids=[];
//   //     self.isLoadingPedido=false;
//   //   }
//   //   });
//   // }
  

  
//   GetCookies = function()
//   {
//     var cookies = document.cookie.split(';');
//     var array = {};
//     for( var i = 0; i < cookies.length; i++ )
//     {
//       var cookie = cookies[i].split('=');
//       array[cookie[0]] = cookie[1];
//     }
//     return array;
//   }
//   ngOnInit(): void {
//     var cookies = this.GetCookies();
//     console.log(cookies);
//       if(!cookies['UserID']){
//         console.log("Nel");
//         return(null);
//       }

//       var self = this;

//       $.get({
//         url: 'http://localhost:777/cuenta/' + cookies['UserID'],
//         xhrFields: {
//           withCredentials: true
//         },
//         success: function (res) {
//           self.user=res;

//         },
//         error: function (){
//           self.router.navigate(['/'], {});
//         }
//       });
     
    
//   }

  
// }



