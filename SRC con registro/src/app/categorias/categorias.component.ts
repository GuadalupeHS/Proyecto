import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWSEC= {Perros: 'Perros', Gatos:'Gatos', Mamiferos:'Mamiferos', Aves:'Aves', Reptiles:'Reptiles', Peces:'Peces'};


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  mascota;

  ngOnInit(): void {

    this.mascota = this.route.snapshot.queryParams["mascota"];
  }
  CurrentView;
  VIEWSEC = VIEWSEC;

}
