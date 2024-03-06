import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
// import { SignupComponent } from './signup.component';
import { AdminModule } from '../admin/admin.module';



@NgModule({
    declarations: [
        // SignupComponent
    ],
    imports: [
        CommonModule,
        AdminModule,
        AppRoutingModule,
    ],
    exports: [
        // SignupComponent
    ]
})
export class SignupModule { }
