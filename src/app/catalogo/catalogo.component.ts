import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';



declare var $: any;
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements AfterViewInit, OnInit {

  constructor(private route: ActivatedRoute) { }

  productos = [];
  nombre;

  SearchProductoNombre = function () {
    var self = this;

    console.log('http://localhost:777/producto/search?nombre='+this.nombre);
    $.ajax({
      method: 'get',
      url: 'http://localhost:777/producto/search?nombre='+this.nombre,
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

  ngAfterViewInit(): void {
  
      if(this.nombre){
        this.SearchProductoNombre();
        console.log(this.nombre);
        console.log('http://localhost:777/producto/search?nombre='+this.nombre);
      }else{
        this.SearchProductos();
      }
  }

  ngOnInit(): void{
    this.nombre = this.route.snapshot.queryParams["nombre"];
  }
}
