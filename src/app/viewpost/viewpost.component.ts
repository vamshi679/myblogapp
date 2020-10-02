import { Component, OnInit, OnChanges } from '@angular/core';
import { GlobalService } from '../helper/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../snackBars/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit, OnChanges {

  blgid: string;
  allposts: any;
  count: number;
  user: string;
  hide: boolean = false;
  hide1: boolean = false;
  allcomments: any;
  comments: any = [];
  imgURL: string | ArrayBuffer = '/assets/images/placeholder1.jpg';
  userdetails: any;

  constructor(private _gs: GlobalService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackObj: SnackBarService,
    public dialog: MatDialog) { }

  ngOnChanges() {
    this._gs.getAllComments().subscribe(msg3 => {
      this.allcomments = msg3['message']
      for (let c of this.allcomments) {
        if (this.blgid == c.blogId) {
          this.comments.push(c)
        }
      }
    })
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userobj')
    // this.userdetails=JSON.parse(localStorage.getItem('userdet'));
    // if(this.userdetails.displayPic && this.user==this.userdetails.userName){
    //   this.imgURL=this.userdetails.displayPic
    // }
    // else{
    //   this.imgURL
    // }

    this.activatedRoute.params.subscribe(params => {
      this.blgid = params['id']
    })

    this._gs.getApprovedById(this.blgid).subscribe(resp => {
      this.allposts = resp['message']
    })

    this._gs.getAllLikesforPost(this.blgid).subscribe(list => {
      let likes = list['message']
      this.count = list['likescount']
      for (let i of likes) {
        if (this.user == i) {
          this.hide = !this.hide
        }
      }
    })

    this._gs.getAllSavedPosts(this.user).subscribe(list1 => {
      var idslist = list1['ids']
      for (let j of idslist) {
        if (this.blgid == j) {
          this.hide1 = !this.hide1;
        }
      }
    })


    this._gs.getAllComments().subscribe(msg3 => {
      this.allcomments = msg3['message']
      for (let c of this.allcomments) {
        if (this.blgid == c.blogId) {
          this.comments.push(c)
        }
      }
    })

  }

  addLike(obj1) {
    if (localStorage.getItem('token') !== 'xx.yy.zz') {
      obj1.loggedUser = this.user
      this._gs.likePost(obj1).subscribe(msg => {
        if (msg['message'] === 'post liked') {
          this.hide = !this.hide;
          this._snackObj.snackBarForLike();
        }
        else {
          this.hide = false;
          this._snackObj.snackBarForUnLike();
        }
      })
    }
    else {
      this.hide = !this.hide;
    }
  }

  addToSave() {
    if (localStorage.getItem('token') !== 'xx.yy.zz') {
      var newobj2 = { userName: '', blogId: '' };
      newobj2.userName = this.user
      newobj2.blogId = this.blgid
      this._gs.savePost(newobj2).subscribe(msg1 => {
        if (msg1['message'] === 'post saved') {
          this.hide1 = !this.hide1;
          this._snackObj.snackBarForSave();
        }
        else {
          this.hide1 = false;
          this._snackObj.snackBarForUnSave();
        }
      })
    }
    else {
      this.hide1 = !this.hide1;
    }
  }


  onClick(obj3: any) {
    obj3.loggedUser = this.user
    obj3.blogId = this.blgid
    if (obj3 !== null || undefined) {
      this._gs.commentPost(obj3).subscribe(msg2 => {
        if (msg2.status == 400) {
          console.log('err in adding comment');
          this._snackObj.snackBarForCmntfail();
        }
        else {
          console.log('success', msg2['message']);
          this._snackObj.snackBarForCmntsuccess();
          this.ngOnChanges();
        }
      })
    }
    else {
      alert('please write your comment and submit')
    }
  }

  share() {
    var url = window.location.href;
    // window.alert(`copy url : ${url}`);
    this.dialog.open(SharedialogComponent, {
      height: '260px',
      width: '450px',
      data:url
    });

  }



}
