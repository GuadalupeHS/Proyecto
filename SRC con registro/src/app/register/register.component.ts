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
  cuenta:[];
  
  user={
    usuario:'',
    email:'',
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    password:''
  }

  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.registro = this.route.snapshot.queryParams["registro"];});
    
  }
  ACT = ACT;
  ngOnInit(): void {
  }
//    comprobarClave(){
//     clave1 = document.f1.clave1.value
//     clave2 = document.f1.clave2.value

//     if (clave1 == clave2)
//        alert("Las dos claves son iguales...\nRealizaríamos las acciones del caso positivo")
//     else
//        alert("Las dos claves son distintas...\nRealizaríamos las acciones del caso negativo")
// }

 


  // PostCuenta = function (){
  //   var self = this;

  //   $.ajax({
  //     method: 'post',
  //     url: 'http://localhost:777/cuenta/usuario',
  //     success: function (result){
  //       self.user = result;
  //     },
  //     error: function (){
  //       self.user = [];
  //     }
      
      
  //   });
    
  // }

    
}





