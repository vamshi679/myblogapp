import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/helper/global.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
})
export class AdmindashboardComponent implements OnInit {

  allposts: any = []
  allposts1: any = []
  allposts2: any = []
  disable: boolean = true;
  enable: boolean;
  nodata: boolean = false;

  constructor(private _gs: GlobalService) { }

  ngOnInit(): void {
    this._gs.getAllPosts().subscribe(data => {
      if (data['message'] == 'no posts found') {
        this.nodata = !this.nodata;
      }
      else {
        this.allposts = data['message']
      }
    })

    this._gs.getAllApproved().subscribe(data1 => {
      if (data1['message'] == 'no posts found') {
        this.nodata = !this.nodata;
      }
      else {
        this.allposts1 = data1['message']
      }
    })

    this._gs.getAllRejected().subscribe(data2 => {
      if (data2['message'] == 'no posts found') {
        this.nodata = !this.nodata;
      }
      else {
        this.allposts2 = data2['message']
      }
    })

  }

  logout() {
    this._gs.logout();
  }

  approveblog(post) {
    this._gs.ApprovePost(post).subscribe(data3 => {
      alert(data3['message'])
      this.ngOnInit();
    })
  }

  rejectblog(post1) {
    this._gs.RejectPost(post1).subscribe(data4 => {
      alert(data4['message']);
      this.ngOnInit();
    })
  }


}
