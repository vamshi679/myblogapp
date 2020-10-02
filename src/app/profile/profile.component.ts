import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../helper/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  userdetails:any;

  constructor(private _gs:GlobalService) { }

  ngOnInit(): void {
    this.userdetails=JSON.parse(localStorage.getItem('userdet'));
    if(this.userdetails.displayPic){
      this.imgURL=this.userdetails.displayPic
    }
    else{
      this.imgURL
    }
  }

  file:File;
  imgURL:string | ArrayBuffer='/assets/images/placeholder.png'; 

  selectImage(imgfile:File){
    this.file=imgfile;
    console.log(this.file);

    //create obj for filereader class
    var reader=new FileReader();

    //read data from file(uploaded file)
    reader.readAsDataURL(this.file)

    //assign url from result attribute to variable 
    reader.onload=()=>{
      this.imgURL=reader.result
    }
  }

  logout() {
    this._gs.logout();
  }

}
