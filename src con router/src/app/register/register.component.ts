import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

const ACT= {Registro:'Registro'};
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})

export class RegisterComponent implements OnInit {
 
  
  registro;
 

  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.registro = this.route.snapshot.queryParams["registro"];});
      
  }
  ACT = ACT;
  ngOnInit(): void {
  }

  cuentaExistente = false;
  datosIncompletos = false;
  aceptarTyC = false;
  errorTyC= false;
  user={
    usuario:'',
    email:'',
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    password:''
  }
  cuentas = [];
  isLoadingRegisters = true;

  PostRegister = function () {

    if(!this.aceptarTyC){
      this.errorTyC = true;
      return(this.errorTyC);
    }
    this.errorTyC = false;
    
    var datos= this.user.email +' '+ this.user.nombre + ' '+ this.user.apellidoPaterno + ' '+ this.user.apellidoMaterno + ' ' + this.user.password;

    if(!this.user.email || !this.user.nombre || !this.user.apellidoPaterno || !this.user.apellidoMaterno || !this.user.password ){
      this.datosIncompletos = true;
      return(this.datosIncompletos);
    }
    this.datosIncompletos = false;

    var params = '';
    params += 'usuario=' + this.user.usuario+ '&';
    params += 'nombre=' + this.user.nombre + '&';
    params += 'apellidoPaterno=' + this.user.apellidoPaterno + '&';
    params += 'apellidoMaterno=' + this.user.apellidoMaterno+ '&';
    params += 'email=' + this.user.email + '&';
    params += 'password=' + this.user.password;

    var numParams = 0;
    var self = this;
    
    //console.log(datos);

    $.ajax({
      method: 'post',
      url: 'http://localhost:777/cuenta/new?'+params,
      success: function (result) {
       
        self.isLoadingRegisters = false;

        if(result.error){
          self.cuentaExistente = true;
          console.log(self.cuentaExistente);
          return(self.cuentaExistente);
        }
        self.cuentas = result ;
        self.router.navigate(['/register/success']);
        
      },
      error: function (){
        console.log("Error :0")
        self.cuentas = [];
        self.isLoadingRegisters = false;
      }
    });
  }

    
}