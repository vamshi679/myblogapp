import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from '../helper/global.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  userid:string;

  constructor(public _gs: GlobalService, private _router: Router) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userobj')
  }

  todash() {
    if (localStorage.getItem('userobj') !== null || undefined) {
      this._router.navigate([`/userdashboard`])
    }
    else {
      this._router.navigate(['/admindashboard'])
    }
  }

}
