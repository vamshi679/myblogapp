import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthGuard } from '../helper/auth.guard';

const routes: Routes = [
  {path:'admindashboard',component:AdmindashboardComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
