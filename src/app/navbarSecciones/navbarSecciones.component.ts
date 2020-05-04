import { Component, OnInit } from '@angular/core';
const VIEWS = {Comida:'Comida', Limpieza: 'Limpieza', Accesorios: 'Accesorios', Juguetes: 'Juguetes',Productos:'Productos'};
// const VIEWSEC= {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};

@Component({
  selector: 'app-secciones',
  templateUrl: './navbarSecciones.component.html',
  styleUrls: ['./navbarSecciones.component.css']
})



export class NavbarSeccionesComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  CurrentView;
  VIEWS=VIEWS;
  // VIEWSEC = VIEWSEC;

}
