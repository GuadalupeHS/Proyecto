import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { SeccionComponent } from './seccion/seccion.component';
import { NavbarSeccionesComponent } from './navbarSecciones/navbarSecciones.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/sucess.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { EditInfoComponent } from './editinfo/editinfo.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    SeccionComponent,
    NavbarSeccionesComponent,
    routingComponents,
    CatalogoComponent,
    AdminComponent,
    CategoriasComponent,
    MainComponent,
    LoginComponent,
    SuccessComponent,
    PedidosComponent,
    EditInfoComponent,
    CheckoutComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
