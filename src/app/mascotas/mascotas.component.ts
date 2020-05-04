import { Component, AfterViewInit } from '@angular/core';
//import json from '../../assets/alumnos.json'

declare var $: any;

@Component({
  selector: 'alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css', '../bootstrap.min.css']
})

export class AlumnosComponent implements AfterViewInit {
  alumnos = [];
  isLoadingAlumnos = true;

  sexoAlumno = 'M';
  edadAlumno = null;

  SearchAlumnos = function () {
    var params = '?';
    var numParams = 0;
    var self = this;

    if( this.sexoAlumno != null){
      params += (numParams != 0 ? '&': '') + 'sexo='+this.sexoAlumno;
      numParams++;
    }

    if(this.edadAlumno != null){
      params += (numParams != 0 ? '&': '') + 'edad='+this.edadAlumno;
      numParams++;
    }

    $.ajax({
      method: 'get',
      url: 'http://localhost:777/student/search'+params,
      success: function (result) {
        self.alumnos = result;
        self.isLoadingAlumnos = false;
      },
      error: function (){
        self.alumnos = [];
        self.isLoadingAlumnos = false;
      }
    });

  }


  ngAfterViewInit(): void {
    var self = this;

    $($('input[type=radio]')[0]).click();
    /*$(function(){
      
    }*/
  }
  /*Definition = {
    pageTitle: 'Alumnos'
  };
  Texto = 'Hola';
  alumnos = json;*/
}