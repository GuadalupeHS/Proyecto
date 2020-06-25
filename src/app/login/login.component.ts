import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {


  datosIncompletos = false;
  sesion = false;
  error = false;
  user={
    email:'',
    password:''
  }
  registro

  constructor(private router: Router) { 
    
    router.events.subscribe((val) => {});
      
  }
  resetPassword(){
  Swal.fire({
    icon: 'warning',
    title: 'Reset Password',
    text: 'Please enter your Email ',
  input: 'email',
  inputPlaceholder: 'Enter your email address'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'An email has been sent',
        'Go and check it!',
        'success'
      )}
    });
  }

  login = function () {

    console.log(this.user.email);
    console.log(this.user.password);
    if(!this.user.email || !this.user.password ){
      this.datosIncompletos = true;
      console.log("Datos Incompletos")
      return(this.datosIncompletos);
    }
    this.datosIncompletos = false;

    var params = '';
    params += 'email=' + this.user.email + '&';
    params += 'password=' + this.user.password;

    if(this.sesion){
      params += '&sesion=true';
    }

    var self = this;
    
    $.ajax({
      method: 'get',
      url: 'http://localhost:777/cuenta/login?'+params,
      xhrFields: {
        withCredentials: true
      },
      success: function (result) {
       

        if(result.error){
          self.error = true;
          return("Error");
        }
        self.error = false;
        self.router.navigate(['/']);
        
      },
      error: function (){
        console.log("Error :0")

      }
    });
  }
  
}