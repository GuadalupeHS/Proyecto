import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWS = {Comida:'Comida', Limpieza: 'Limpieza', Accesorios: 'Accesorios', Juguetes: 'Juguetes',Productos:'Productos'};

declare var $: any;
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  Cart = {};
  productos = [];
  nombre;
  textoPrecios = 'Todo';
  textoOrden = 'Ordenar por';
  filtros = {
    nombre: '',
    departamento: '',
    mascota: '',
    precios: '',
    orden: ''
  }

  constructor(private route: ActivatedRoute, private router: Router) { 

    router.events.subscribe((val) => {
      this.filtros.nombre = this.route.snapshot.queryParams["nombre"];
      this.filtros.departamento = this.route.snapshot.queryParams["departamento"];
      this.filtros.mascota = this.route.snapshot.queryParams["mascota"];
      this.filtros.precios = this.route.snapshot.queryParams["precios"]
      this.filtros.orden = this.route.snapshot.queryParams["orden"];

      if(this.filtros.nombre || this.filtros.departamento || this.filtros.mascota || this.filtros.precios){
        this.SearchProductoFiltros();
      }else{
        this.SearchProductos();
      }
      console.log(this.filtros);
    });
  }

  cambiarRuta = function(){
    this.router.navigate(['/catalogo'], {queryParams: this.filtros});
  }

  getId = function(index){
    console.log("#producto"+index);
    return ("#producto"+index);
  }

  setId = function(index){
    console.log("producto"+index);
    return ("producto"+index);
  }
  
  desactivar = function(desactivar){
    if (desactivar == 'minimo'){
      this.filtros.pMin = undefined;
    }else{
      this.filtros.pMax = undefined;
    }
    this.cambiarRuta();
  }

  cambiar = function(cambiar){
    if (cambiar == 'minimo'){
      this.minimo = !this.minimo;
      !this.minimo ? this.desactivar('minimo') : null;
    }else{
      this.maximo = !this.maximo;
      !this.maximo ? this.desactivar('maximo') : null;
    }
  }
  

  SearchProductoFiltros = function () {
    var self = this;
    var texto = ""; 
    var masParams = false;
    if(this.filtros.nombre){
      texto +=  ("nombre="+ this.filtros.nombre);
      masParams = true;
    }
    if(this.filtros.departamento){
      if(masParams){
        texto += "&"
      }
      texto +=  ("departamento="+ this.filtros.departamento);
      masParams=true;
    }
    if(this.filtros.mascota){
      if(masParams){
        texto += "&"
      }
      texto +=  ("mascota="+ this.filtros.mascota);
      masParams=true;
    }
    if(this.filtros.precios){
      if(masParams){
        texto += "&"
      }
      texto +=  ("precios="+ this.filtros.precios);
      masParams=true;
    }
    if(this.filtros.orden){
      if(masParams){
        texto += "&"
      }
      texto +=  ("orden="+ this.filtros.orden);
    }
    
    $.ajax({
      method: 'get',
      url: 'http://localhost:777/producto/search?'+texto,
      success: function (result){
        self.productos = result;
      },
      error: function (){
        self.productos = [];
      }
    });


  }

  SearchProductos = function () {
    var self = this;
    var url = 'http://localhost:777/producto/all';

    if(this.filtros.orden){
      url +=  ("?orden="+ this.filtros.orden);
    }
    $.ajax({
      method: 'get',
      url: url,
      success: function (result){
        self.productos = result;
      },
      error: function (){
        self.productos = [];
      }
    });
    console.log(self.productos)
  }

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

  AgregarAlCarrito = function (id){
    var cookies = this.GetCookies();
    var self = this;
    console.log(id);

    $.get({
      url: 'http://localhost:777/cart/add?id='+id,
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        self.Cart = res;
        console.log(res);
      }
    });
  }
}

