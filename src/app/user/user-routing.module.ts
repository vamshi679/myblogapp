import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AuthGuard } from '../helper/auth.guard';
import { SavedpostsComponent } from './savedposts/savedposts.component';

const routes: Routes = [
  { path: 'userdashboard', component: UserdashboardComponent, canActivate: [AuthGuard] },
  { path: 'savedposts', component: SavedpostsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
