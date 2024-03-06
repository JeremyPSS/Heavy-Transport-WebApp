import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ConsultasComponent } from './consultas/consultas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginAppComponent } from './login-app/login-app.component';
import { AgregarComponent } from './mantenimiento/agregar/agregar.component';
import { ListarComponent } from './mantenimiento/listar/listar.component';
import { PrincipalComponent } from './mantenimiento/principal/principal.component';
// import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ConsultasComponent,
    LoginComponent,
    SignupComponent,
    LoginAppComponent,
    AgregarComponent,
    ListarComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
