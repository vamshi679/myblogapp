import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
// angular material 
import {MaterialModule} from '../material/material.module';
import { HelperModule } from '../helper/helper.module';
import { SavedpostsComponent } from './savedposts/savedposts.component'


@NgModule({
  declarations: [UserdashboardComponent, SavedpostsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HelperModule,
    // material
    MaterialModule
  ]
})
export class UserModule { }
