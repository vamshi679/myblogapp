import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import {MaterialModule} from '../material/material.module';
import { HelperModule } from '../helper/helper.module'



@NgModule({
  declarations: [AdmindashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HelperModule,
    // material
    MaterialModule
  ]
})
export class AdminModule { }
