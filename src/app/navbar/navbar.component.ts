import { Component, OnInit } from '@angular/core';

function link(nombre){

}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  busqueda = {
    nombre: ''
  };
  ngOnInit(): void {
  }

}
