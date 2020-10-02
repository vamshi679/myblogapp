import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public _snackbar:MatSnackBar) { }

  snackBarForLike(){
    this._snackbar.open('Post Liked','Dismiss',{
      duration:3000
    })
  }
  
  snackBarForUnLike(){
    this._snackbar.open('Post Unliked','Dismiss',{
      duration:3000
    })
  }

  snackBarForSave(){
    this._snackbar.open('Post Saved','Dismiss',{
      duration:3000
    })
  }
  snackBarForUnSave(){
    this._snackbar.open('Post Unsaved','Dismiss',{
      duration:3000
    })
  }
  snackBarForCmntsuccess(){
    this._snackbar.open('Post Successfully','Dismiss',{
      duration:3000
    })
  }
  snackBarForCmntfail(){
    this._snackbar.open('Post not successful','Dismiss',{
      duration:3000
    })
  }

  


}


