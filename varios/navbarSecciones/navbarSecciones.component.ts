import { Component, OnInit } from '@angular/core';
const Secciones = {Comida:'Comida', Limpieza: 'Limpieza', Accesorios: 'Accesorios', Juguetes: 'Juguetes',Productos:'Productos'};

@Component({
  selector: 'app-secciones',
  templateUrl: './navbarSecciones.component.html',
  styleUrls: ['./navbarSecciones.component.css']
})



export class NavbarSeccionesComponent implements OnInit {
  CurrentView;
  SEC = Secciones;
  constructor() { }
  ngOnInit(): void {
  }
 
  
}
