import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
const VIEWS = {Comida:'Comida', Limpieza: 'Limpieza', Accesorios: 'Accesorios', Juguetes: 'Juguetes',Productos:'Productos'};

@Component({
  selector: 'seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})

export class SeccionComponent{
  seccion;

  filtros = {
    departamento: '',
    mascota: '',
  }
  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.seccion = this.route.snapshot.queryParams["seccion"];
      this.filtros.departamento = this.seccion;
  });
    
  }

  cambiarRuta = function(mascota){
    this.filtros.mascota = mascota
    this.router.navigate(['/catalogo'], {queryParams: this.filtros});
  }

 
  CurrentView;
  VIEWS = VIEWS;

  }
