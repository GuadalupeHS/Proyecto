import { Component } from '@angular/core';
const VIEWSEC= {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};

@Component({
  selector: 'categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  CurrentView;
  VIEWSEC = VIEWSEC;
}