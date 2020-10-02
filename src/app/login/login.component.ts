import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../helper/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  token: string;
  // errMsg = '';

  constructor(private _gs: GlobalService, private _router: Router) { }

  ngOnInit(): void {}

  logout(){
    this._gs.logout();
  }

  onSubmit(x) {   
    if (x.userName == 'admin123' && x.password == 'admin123') {
      this._router.navigate(['/admindashboard'])
      this.token = 'xx.yy.zz'
      localStorage.setItem('token', this.token)
    }

    else if (x !== '') {
      this._gs.login(x).subscribe(resp => {
        if (resp['message'] === 'success') {
          // this.userid = resp[('userName')]
          localStorage.setItem('userobj',resp['userName'])
          localStorage.setItem('userdet',JSON.stringify(resp["userObject"]))
          localStorage.setItem('token', resp['token'])
          this._router.navigate([`/userdashboard`])
          alert(resp['message'])
        }
        else {
          // this.errMsg = resp['message']
          alert(resp['message'])
        }
      })
    }
    else {
      // this.errMsg = 'please check your credentials and try again'
      alert('please check your credentials and try again')
    }

  }

}
