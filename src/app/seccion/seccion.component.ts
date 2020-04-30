import { Component } from '@angular/core';
const VIEWS = {Comida:'Comida', Limpieza: 'Limpieza', Accesorios: 'Accesorios', Juguetes: 'Juguetes'};

@Component({
  selector: 'seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent {
  CurrentView;
  VIEWS=VIEWS;

}