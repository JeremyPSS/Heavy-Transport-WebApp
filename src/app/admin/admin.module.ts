import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BusesModule } from '../buses/buses.module';
import { ChoferModule } from '../chofer/chofer.module';
import { TripulacionModule } from '../tripulacion/tripulacion.module';
import { ViajeModule } from '../viaje/viaje.module';
import { LoginComponent } from '../login/login.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    BusesModule,
    ChoferModule,
    TripulacionModule,
    ViajeModule,
    AppRoutingModule,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
