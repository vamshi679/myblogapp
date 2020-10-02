import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../helper/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  file: File
  // imgURL:string| ArrayBuffer='/assets/images/placeholder.png'
  imgURL: string | ArrayBuffer;

  constructor(private _gs: GlobalService, private _router: Router) { }

  ngOnInit(): void {
  }

  showImage(img: File) {
    // console.log(img);
    this.file=img

    //read file data 
    var reader = new FileReader();

    //convert data and read as url
    reader.readAsDataURL(img)

    //onload assign url to variable
    reader.onload = () => {
      this.imgURL = reader.result;
    }

  }

  onSubmit(y) {
    //getting formdata obj
    let fd = new FormData();

    //appending image to form object
    fd.append('photo',this.file)
    fd.append('rform',JSON.stringify(y))

    // console.log(fd)

    console.log(y)
    this._gs.registerNew(fd).subscribe(result => {
      console.log('success')
      this._router.navigate(['/login'])
    })
  }

}
