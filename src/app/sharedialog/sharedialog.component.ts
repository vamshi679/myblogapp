import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styles: []
})
export class SharedialogComponent implements OnInit {

  url:string=''

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    // this.url=data
  }

  ngOnInit(): void {
  }

}
