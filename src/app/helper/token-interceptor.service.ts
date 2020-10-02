import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public injector:Injector) { }

  intercept(req, next) {
    let _gs=this.injector.get(GlobalService)
    let reqwithtoken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_gs.getToken()}`
      }
    })
    return next.handle(reqwithtoken)
  }
}
