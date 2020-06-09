import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
      )
    }
  });
}
  constructor() { }

  ngOnInit(): void {
  }

}