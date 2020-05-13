import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SeccionComponent } from './seccion/seccion.component';
import { NavbarSeccionesComponent } from './navbarSecciones/navbarSecciones.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AdminComponent } from './admin/admin.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    CategoriaComponent,
    SeccionComponent,
    NavbarSeccionesComponent,
    routingComponents,
    CatalogoComponent,
    AdminComponent,
    TarjetaComponent,
    CategoriasComponent,
    MainComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
