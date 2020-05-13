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

    var datos= this.user.email +' '+ this.user.nombre + ' '+ this.user.apellidoPaterno + ' '+ this.user.apellidoMaterno + ' ' + this.user.password;

    var params = '';
    params += 'usuario=' + this.user.usuario+ '&';
    params += 'nombre=' + this.user.nombre + '&';
    params += 'apellidoParerno=' + this.user.apellidoPaterno + '&';
    params += 'apellidoMaterno=' + this.user.apellidoMaterno+ '&';
    params += 'email=' + this.user.email + '&';
    params += 'password=' + this.user.password;

    var numParams = 0;
    var self = this;
    
    console.log(datos);

    $.ajax({
      method: 'post',
      url: 'http://localhost:777/cuenta/new?'+params,
      success: function (result) {
       
        self.cuentas = result ;
        self.isLoadingRegisters = false;
      },
      error: function (){
        self.cuentas = [];
        self.isLoadingRegisters = false;
      }
    });
  }

    
}





