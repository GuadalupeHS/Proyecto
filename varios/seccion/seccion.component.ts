import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWS = {Comida:'Comida', Limpieza: 'Limpieza', Accesorios: 'Accesorios', Juguetes: 'Juguetes',Productos:'Productos'};

@Component({
  selector: 'seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})

export class SeccionComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  seccion;

  ngOnInit(): void {

    this.seccion = this.route.snapshot.queryParams["seccion"];
  }
  CurrentView;
  VIEWS = VIEWS;

  }
