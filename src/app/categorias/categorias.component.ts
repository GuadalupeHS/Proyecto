import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWSEC= {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  mascota;
  departamento;
  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.mascota = this.route.snapshot.queryParams["mascota"];
      this.departamento = this.route.snapshot.queryParams["departamento"]
     });
  }

  CurrentView;
  VIEWSEC = VIEWSEC;
 

}
