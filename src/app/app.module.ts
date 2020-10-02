import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
//components imported from seperate module
import { ComponentsModule } from "./components/components.module";
import { HelperModule } from './helper/helper.module'
import { httpInterceptProvider } from "./helper/index";

import { AdminModule } from '../app/admin/admin.module';
import { UserModule } from '../app/user/user.module';

import { AuthGuard } from './helper/auth.guard';
import { GlobalService } from './helper/global.service';
import { SnackBarService } from "./snackBars/snack-bar.service";

@NgModule({
  declarations: [AppComponent],
  imports: [ 
    ComponentsModule,
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    AdminModule,
    UserModule,
    HelperModule,
  ],
  providers: [
    GlobalService,
    AuthGuard,
    httpInterceptProvider,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
