import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptorService } from '../token-interceptor.service';

const helperAPIs = [
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  EditorModule,
]

@NgModule({
  imports: [
    CommonModule,
    helperAPIs
  ],
  exports: [helperAPIs]
})
export class HelperModule { }
