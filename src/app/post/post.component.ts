import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../helper/global.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {

  userName: string;

  constructor(private _gs: GlobalService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userobj')
  }

  addPost(z) {
    if (this._gs.loggedIn() == true && localStorage.getItem('userobj') == this.userName) {
      z.userName = this.userName;
      this._gs.addPost(z).subscribe(resp => {
        if (resp['message'] == 'failed to post') {
          alert(resp['message'])
        }
        else if(resp.status==401){
          alert(resp['message'])
        }
        else {
          alert(resp['message'])
          this.ngOnInit();
        }
      })
    }
    else{
      alert('please login to write post')
    }

  }



}
