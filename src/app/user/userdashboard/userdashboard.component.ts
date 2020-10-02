import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/helper/global.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
})
export class UserdashboardComponent implements OnInit, OnChanges {

  userName: string;
  userdetails:any; 
  allposts: any[];
  hide; boolean = false;
  dataRefill: any = [];
  imgURL:string | ArrayBuffer='/assets/images/placeholder1.jpg';

  View: boolean = true;
  Edit: boolean = false;
  load: boolean = true;

  nodata: boolean;

  constructor(private _router: Router, private _gs: GlobalService, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userobj')
    this.userdetails=JSON.parse(localStorage.getItem('userdet'));
    if(this.userdetails.displayPic){
      this.imgURL=this.userdetails.displayPic
    }
    else{
      this.imgURL
    }

    this._gs.getByUser(this.userName).subscribe(data => { 
      if (data['message'] == 'no data found') {
        this.nodata = true;
        this.load = !this.load;
      }
      else {
        this.allposts = data['message'];
        this.load = !this.load;
      }
    })
  }

  ngOnChanges() {
    this._gs.getByUser(this.userName).subscribe(data => {
      this.allposts = data['message'];
    })
  }

  logout() {
    this._gs.logout();
  }

  topost() {
    this._router.navigate(['/post'])
  }

  openEdit(data) {
    this.View = false;
    this.Edit = true;
    this.dataRefill = data
  }

  openView() {
    this.Edit = false;
    this.View = true;
  }

  updatePost(newdata) {
    this._gs.updatePost(newdata).subscribe(respns => {
      this.ngOnChanges();
      alert(respns['message'])
    })
  }

  remove(id) {
    let a = confirm('Are you sure')
    if (a == true) {
      this._gs.deletePost(id).subscribe(respns1 => {
        this.ngOnChanges();
        alert(respns1['message'])
      })
    }
    else {
      this.ngOnChanges();
    }
  }



}
