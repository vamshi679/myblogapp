import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  fromParent: string;
  toParent: string;

  constructor(private _hc: HttpClient, private _route: Router) { }

  parentToChild() {
    return this.fromParent;
  }

  childToParent() {
    return this.toParent;
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  registerNew(y): Observable<any> {
    return this._hc.post('/admin/register', y)
  }

  getToken(){
    return localStorage.getItem('token'); 
  }

  //login related requests
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userobj');
    localStorage.removeItem('userdet');
    this._route.navigate(['/login'])
  }

  login(x): Observable<any> {
    return this._hc.post<any>('/admin/login', x);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }

  //////////////////////////////// post related requests //////////////////////////////////
  addPost(z): Observable<any> {
    return this._hc.post('/user/addpost', z)
  }

  updatePost(g): Observable<any> {
    return this._hc.put('/user/updatepost', g)
  }

  deletePost(f): Observable<any> {
    return this._hc.delete(`/user/removepost/${f}`)
  }

  getAllPosts(): Observable<any> {
    return this._hc.get('/user/getallposts')
  }

  ApprovePost(k): Observable<any> {
    return this._hc.post('/admin/approveblog', k)
  }

  RejectPost(l): Observable<any> {
    return this._hc.post('/admin/rejectblog', l)
  }

  getAllApproved(): Observable<any> {
    return this._hc.get('/admin/getallapproved')
  }

  getAllRejected(): Observable<any> {
    return this._hc.get('/admin/getallrejected')
  }

  getById(id): Observable<any> {
    return this._hc.get(`/user/getpostbyid/${id}`)
  }

  getApprovedById(id): Observable<any> {
    return this._hc.get(`/admin/getpostbyid/${id}`)
  }

  getByUser(un): Observable<any> {
    return this._hc.get(`/user/getpostbyusername/${un}`)
  }

  likePost(n):Observable<any>{
    return this._hc.put('/user/add-removelike',n)
  }

  savePost(m):Observable<any>{
    return this._hc.put('/user/save-unsaveposts',m)
  }

  commentPost(c):Observable<any>{
    return this._hc.post('/user/addcomment',c)
  }

  getAllSavedPosts(un):Observable<any>{
    return this._hc.get(`/user/getallsaved/${un}`)
  }

  getAllLikesforPost(id):Observable<any>{
    return this._hc.get(`/user/getlikeslist/${id}`)
  }

  getAllComments():Observable<any>{
    return this._hc.get(`/user/getallcomments`)
  }
  


}
