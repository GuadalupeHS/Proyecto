import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'editinfo',
  templateUrl: './editinfo.component.html',
  styleUrls: ['./editinfo.component.css']
})
export class EditInfoComponent {
  constructor() { }

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
  
}





