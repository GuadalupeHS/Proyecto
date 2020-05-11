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

  productos = [];
  nombre;
  minimo = false;
  maximo = false;
  filtros = {
    nombre: '',
    departamento: '',
    mascota: '',
    pMin: '',
    pMax: '',
    orden: ''
  }

  constructor(private route: ActivatedRoute, private router: Router) { 

    router.events.subscribe((val) => {
      this.filtros.nombre = this.route.snapshot.queryParams["nombre"];
      this.filtros.departamento = this.route.snapshot.queryParams["departamento"];
      this.filtros.mascota = this.route.snapshot.queryParams["mascota"];
      this.filtros.pMin = this.route.snapshot.queryParams["pMin"];
      this.filtros.pMax = this.route.snapshot.queryParams["pMax"];
      this.filtros.orden = this.route.snapshot.queryParams["orden"];

      if(this.filtros.nombre || this.filtros.departamento || this.filtros.mascota){
        console.log("Es verdad");
        this.SearchProductoFiltros();
      }else{
        console.log("Es falso");
        this.SearchProductos();
      }
      console.log(this.filtros);
    });
  }

  cambiarRuta = function(){
    this.router.navigate(['/catalogo'], {queryParams: this.filtros});
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
    }
    if(this.filtros.pMin){
      if(masParams){
        texto += "&"
      }
      texto +=  ("pMin="+ this.filtros.pMin);
    }
    if(this.filtros.pMax){
      if(masParams){
        texto += "&"
      }
      texto +=  ("pMax="+ this.filtros.pMax);
    }
    console.log(texto);

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

    $.ajax({
      method: 'get',
      url: 'http://localhost:777/producto/all',
      success: function (result){
        self.productos = result;
      },
      error: function (){
        self.productos = [];
      }
    });
    console.log(self.productos)
  }
}
