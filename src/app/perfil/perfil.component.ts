import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWOPT ={DatosP: 'DatosP', Editar:'Editar', AgregarDatos:'AgregarDatos'}
//const VIEWOPT ={DatosP: 'DatosP', Editar:'Editar'}
declare var $: any;

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
  
})

export class PerfilComponent implements OnInit{
  option;

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
            this.router.navigate(['/'], {});
          }
        });
  }

  GetCookies = function()
  {
    var cookies = document.cookie.split('; ');
    console.log(cookies);
    var array = {};
    for( var i = 0; i < cookies.length; i++ )
    {
      var cookie = cookies[i].split('=');
      array[cookie[0]] = cookie[1];
    }
    return array;
  }

  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.option = this.route.snapshot.queryParams["option"];
     
     });
  }
  CurrentView;
  VIEWOPT=VIEWOPT;

//   cuentas = []; 

//   isLoadingCuentas = true;
 
//   SearchCuenta = function()
//   {  
  
//     var params ='?';
//     var numParams =0;
//     var self = this; 
//     if ( this.usuario != null)
//     {
//       params += ( numParams != 0 ? '&': '')+ 'usuario=' + this.usuario;
//       numParams++;
//     }
    
//     $.ajax ({
//       method: 'get',
//       url: 'http://localhost:777/cuenta/search' + params,
//       success: function(result){
//         self.cuentas=result;
//         self.isLoadingCuentas=false;
//       // alert ('Ok');
//     },
//     error:function (xhr, ajaxOptions, thrownError){
//       self.cuentas=[];
//       self.isLoadingCuentas=false;
//     // alert('error');
//     }
//   });

// }

}
  // user={
  //   calle:'',
  //   numExterior:'',
  //   numInterior:'',
  //   colonia:'',
  //   codigoPostal:'',
  //   municipio:'',
  //   estado:'',
  //   pais:'',
  //   telefono:''
  // }
  guardar=[];
  isLoadingUser = true;

 
  AddInfo = function () {
   
    var params = '';
    params += 'usuario=' + this.user.usuario+ '&';
    params += 'calle=' + this.user.calle + '&';
    params += 'numExterior=' + this.user.numExterior + '&';
    params += 'numInterior=' + this.user.numInterior + '&';
    params += 'colonia=' + this.user.colonia + '&';
    params += 'codigoPostal=' + this.user.codigoPostal + '&';
    params += 'municipio=' + this.user.municipio + '&';
    params += 'estado=' + this.user.estado + '&';
    params += 'pais=' + this.user.pais + '&';
    params += 'telefono=' + this.user.telefono;
    var self = this; 
    
    $.ajax ({
      method: 'put',
      url: 'http://localhost:777/cuenta/info?' + params,
      success: function(result){
        self.guardar=result;
        self.isLoadingUser=false;
      // alert ('Ok');
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.guardar=[];
      self.isLoadingUser=false;
     
     alert('error');
    }
    });

  }

  //Editar
  // user={
  //   "usuario":'',
  //   "email":'',
  //   "nombre":'',
  //   "apellidoPaterno":'',
  //   "apellidoMaterno":'',
  //   "calle":'',
  //   "numExterior":'',
  //   "numInterior":'',
  //   "colonia":'',
  //   "codigoPostal":'',
  //   "municipio":'',
  //   "estado":'',
  //   "pais":'',
  //   "telefono":'',
  //   "password":''
  // }
  edits={};
 
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
    console.log(params);
    $.ajax ({
      method: 'put',
      url: 'http://localhost:777/cuenta/info?' + params,
      success: function(result){
        self.edits=result;
        self.isLoadingUser=false;
      // alert ('Ok');
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.edits={};
      self.isLoadingUser=false;
     
     alert('error');
    }
    });
  }  
}
