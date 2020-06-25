import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {

  mascota;
  departamento;
  registro;
  constructor(private route: ActivatedRoute, private router: Router) { 
    
    router.events.subscribe((val) => {
      this.mascota = this.route.snapshot.queryParams["mascota"];
      this.departamento = this.route.snapshot.queryParams["departamento"];
      this.registro = this.route.snapshot.queryParams["registro"];
     });
  }
 
}
