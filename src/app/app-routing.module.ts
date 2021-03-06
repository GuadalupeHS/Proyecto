import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent} from './main/main.component';
import { SeccionComponent } from './seccion/seccion.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/sucess.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PedidosComponent } from './pedidos/pedidos.component';




const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent},
  { path: 'seccion', component: SeccionComponent},
  { path: 'catalogo', component: CatalogoComponent},  
  { path: 'register', component: RegisterComponent},
  { path: 'register/success', component: SuccessComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'main', component: MainComponent},
  { path: 'secciones', component: SeccionComponent},
  { path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'pedido/success', component: PedidosComponent},
  { path: '*', redirectTo:'/main', pathMatch: 'full'},
  { path: '**', component: MainComponent}



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ CategoriasComponent, CatalogoComponent,AdminComponent, MainComponent, RegisterComponent, PerfilComponent, PedidosComponent]