import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../helper/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  allposts: any = []
  nodata:boolean=false;
  load:boolean=true;

  constructor(public _gs: GlobalService, private _router: Router) { }

  ngOnInit(): void {
    this._gs.getAllApproved().subscribe(result => {
      if(result['message']==='no posts found'){
        this.load=!this.load
        this.nodata=!this.nodata;
      }
      else{
        this.allposts=result['message']
        this.load=!this.load
      }
    })
  }
  
  gotoviewpost(id){
    this._router.navigate([`/viewpost/${id}`])
  }

  topost(){
    this._router.navigate(['/post'])
  }

  todash(){
    if(localStorage.getItem('')==null){
      this._router.navigate(['/admindashboard'])
    }
    else{
      this._router.navigate(['/userdashboard'])
    }
  }

}
