import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SeccionComponent } from './seccion/seccion.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    SeccionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] //SeccionComponent
})
export class AppModule { }
