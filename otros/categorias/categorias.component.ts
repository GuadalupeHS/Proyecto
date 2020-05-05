import { Component, OnInit } from '@angular/core';
const VIEWSEC= {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  CurrentView;
  VIEWSEC = VIEWSEC;

}
