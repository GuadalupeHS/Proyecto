import { Component, OnInit } from '@angular/core';
const Categorias = {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  CurrentView;
  CAT = Categorias;
  constructor() { }

  ngOnInit(): void {
  }


}
