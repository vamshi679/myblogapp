import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _gs: GlobalService, private _router: Router){}

  canActivate():boolean{
    if(this._gs.loggedIn()){
      return true
    }
    else{
      this._router.navigate(['/login'])
      return false
    }
  }
  
}
