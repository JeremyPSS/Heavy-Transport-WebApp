import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PrincipalComponent as viaje } from './viaje/principal/principal.component';
import { PrincipalComponent as tripulacion } from './tripulacion/principal/principal.component';
import { PrincipalComponent as chofer } from './chofer/principal/principal.component';
import { PrincipalComponent as buses } from './buses/principal/principal.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { SignupComponent } from './signup/signup.component';
import { PrincipalComponent as mantenimiento } from './mantenimiento/principal/principal.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: chofer},
  { path: 'signup', component: SignupComponent},
  { path: 'viajes', component: viaje },
  { path: 'buses', component: buses },
  { path: 'choferes', component: chofer },
  { path: 'tripulacion', component: tripulacion },
  { path: 'consultas', component: ConsultasComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'mantenimiento', component: mantenimiento},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
