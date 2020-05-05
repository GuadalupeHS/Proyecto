import { Component, OnInit } from '@angular/core';
const VIEWSEC= {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  CurrentView;
  VIEWSEC = VIEWSEC;
  constructor() { }

  ngOnInit(): void {
  }


}
