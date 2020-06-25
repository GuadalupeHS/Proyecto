import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

const VIEW ={Pagar: 'Pagar', Success: 'Success'};
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
    "pais":''
  }
  
  guardar=[];
  isLoadingUser = true;
  
  
  AddInfo = function () {
   
    var params = '';
    params += 'usuario=' + this.user.usuario+ '&';
    params += 'nombre=' + this.user.nombre + '&';
    params += 'numTarjeta=' + this.user.numTarjeta + '&';
    params += 'fechaExp=' + this.user.fechaExp + '&';
    params += 'cvv=' + this.user.cvv;
    
  
    
    var self = this; 
    
    $.ajax ({
      method: 'put',
      url: 'http://localhost:777/cuenta/info?' + params,
      success: function(result){
        self.guardar=result;
        // self.router.navigate(['/perfil'], {queryParams: {option:'DatosP'}});
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.guardar=[];
      self.isLoadingUser=false;
    }
    });
  
  }

  pedidos=[];
  isLoadingPedido = true;
  
  
  AddPedido = function () {
   
    var params = '';
    params += 'usuario=' + this.user.usuario+ '&';
    params += 'nombre=' + this.user.nombre + '&';
    params += 'numTarjeta=' + this.user.numTarjeta + '&';
    params += 'fechaExp=' + this.user.fechaExp + '&';
    params += 'cvv=' + this.user.cvv + '&';
    params += 'calle=' + this.user.calle + '&';
    params += 'numExterior=' + this.user.numExterior + '&';
    params += 'colonia=' + this.user.colonia + '&';
    params += 'codigoPostal=' + this.user.codigoPostal + '&';
    params += 'municipio=' + this.user.municipio + '&';
    params += 'estado=' + this.user.estado + '&';
    params += 'pais=' + this.user.pais;
  
    console.log(params)
    var self = this;
    $.ajax ({
      method: 'post',
      url: 'http://localhost:777/pedido/order?' + params,
      success: function(result){
        self.pedidos=result;
        // self.router.navigate(['/perfil'], {queryParams: {option:'DatosP'}});
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.pedidos=[];
      self.isLoadingPedido=false;
    }
    });
  
  }



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
    this.actualizarCarrito();

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

