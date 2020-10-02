import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms'

import { HomeComponent } from '../home/home.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ViewpostComponent } from '../viewpost/viewpost.component';
import { PostComponent } from '../post/post.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';

import { RouterModule, Routes } from '@angular/router';
import { ClipboardModule } from "@angular/cdk/clipboard";


const cmpts = [
  HomeComponent,
  BlogsComponent,
  LoginComponent,
  RegisterComponent,
  PostComponent,
  ViewpostComponent,
  ProfileComponent,
  NavbarComponent,
  SharedialogComponent
]

@NgModule({
  declarations: [cmpts],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    EditorModule,
    RouterModule,
    ClipboardModule
  ],
  exports: [cmpts]
})
export class ComponentsModule { }
