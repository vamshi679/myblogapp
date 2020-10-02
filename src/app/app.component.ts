import { Component } from '@angular/core';
import { GlobalService } from './helper/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';

  constructor(public _gs: GlobalService, private _router: Router) {
  }

}
