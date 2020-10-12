import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/helper/global.service';

@Component({
  selector: 'app-savedposts',
  templateUrl: './savedposts.component.html',
  styles: [
  ]
})
export class SavedpostsComponent implements OnInit {

  userName:string
  savedlist:any;
  nodata:boolean; 
  nodata1:boolean;
  userdetails:any;
  imgURL:string | ArrayBuffer='/assets/images/placeholder1.jpg';

  constructor(private _gs:GlobalService, private _router:Router) { }

  ngOnInit(): void {
    this.userName=localStorage.getItem('userobj')
    this.userdetails=JSON.parse(localStorage.getItem('userdet'));
    if(this.userdetails.displayPic){
      this.imgURL=this.userdetails.displayPic
    }
    else{
      this.imgURL
    }

<<<<<<< HEAD
    if (localStorage.getItem('userobj') !== null || undefined) {
      this._gs.getAllSavedPosts(this.userName).subscribe(resp=>{
        if(resp['message']=='no saved posts'){
          this.nodata = true;
        }
        else{
          this.savedlist=resp['message']
          this.nodata1=true;
        }
      })
=======
    if(localStorage.getItem('userobj') !== null || undefined){
    this._gs.getAllSavedPosts(this.userName).subscribe(resp=>{
      if(resp['message']=='no saved posts'){
        this.nodata = true;
      }
      else{
        this.savedlist=resp['message']
        this.nodata1=true;
      }
    })
>>>>>>> 737809f2b30b9fa3f0041f07db49d4979bc163fe
    }
  }

  todash() {
    if (localStorage.getItem('userobj') !== null || undefined) {
      this._router.navigate([`/userdashboard`])
    }
    else {
      this._router.navigate(['/admindashboard'])
    }
  }

  logout(){
    this._gs.logout();
  }

}
