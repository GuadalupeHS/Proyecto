import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWOPT ={DatosP: 'DatosP', Editar:'Editar', AgregarDatos:'AgregarDatos'}
declare var $: any;
@Component({
  selector: 'editinfo',
  templateUrl: './editinfo.component.html',
  styleUrls: ['./editinfo.component.css']
})
export class EditInfoComponent {
  option;

  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.option = this.route.snapshot.queryParams["option"];
     
     });
  }
  CurrentView;
  VIEWOPT=VIEWOPT;


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
  edits=[];
  isLoadingUser = true;
 
  EditInfo = function () {
    var params = '';
    params += 'usuario=' + this.user.usuario+ '&';
    params += 'email=' + this.user.email + '&';
    params += 'nombre=' + this.user.nombre + '&';
    params += 'apellidoPaterno=' + this.user.apellidoPaterno + '&';
    params += 'apellidoMaterno=' + this.user.apellidoMaterno + '&';
    params += 'calle=' + this.user.calle + '&';
    params += 'numExterior=' + this.user.numExterior + '&';
    params += 'numInterior=' + this.user.numInterior + '&';
    params += 'colonia=' + this.user.colonia + '&';
    params += 'codigoPostal=' + this.user.codigoPostal + '&';
    params += 'municipio=' + this.user.municipio + '&';
    params += 'estado=' + this.user.estado + '&';
    params += 'pais=' + this.user.pais + '&';
    params += 'telefono=' + this.user.telefono +'&';
    params += 'password=' + this.user.password;
    var self = this; 
    
    $.ajax ({
      method: 'put',
      url: 'http://localhost:777/cuenta/info?' + params,
      success: function(result){
        self.edits=result;
        console.log(self.edits);
        
        self.isLoadingUser=false;
      // alert ('Ok');
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.edits=[];
      self.isLoadingUser=false;
     
     alert('error');
    }
    });
  }
  users={
    calle:'',
    numExterior:'',
    numInterior:'',
    colonia:'',
    codigoPostal:'',
    municipio:'',
    estado:'',
    pais:'',
    telefono:''
  }
  guardar=[];
  isLoadingUsers = true;
 
  AddInfo = function () {
    var params = '';
    params += 'usuario=' + this.usuario+ '&';
    params += 'calle=' + this.users.calle + '&';
    params += 'numExterior=' + this.users.numExterior + '&';
    params += 'numInterior=' + this.users.numInterior + '&';
    params += 'colonia=' + this.users.colonia + '&';
    params += 'codigoPostal=' + this.users.codigoPostal + '&';
    params += 'municipio=' + this.users.municipio + '&';
    params += 'estado=' + this.users.estado + '&';
    params += 'pais=' + this.users.pais + '&';
    params += 'telefono=' + this.users.telefono;
    var self = this; 
    
    $.ajax ({
      method: 'put',
      url: 'http://localhost:777/cuenta/info?' + params,
      success: function(result){
        self.guardar=result;
        console.log(self.edits);
        
        self.isLoadingUsers=false;
      // alert ('Ok');
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.guardar=[];
      self.isLoadingUsers=false;
     
     alert('error');
    }
    });

  }


  
}





