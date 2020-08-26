import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {    
  userName: string;
  formData: User;
  userList: User[];

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private http: HttpClient) { }
  readonly BaseURI = 'https://stsdash.azurewebsites.net/api';

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  login(formData) {
    return this.http.post(
      this.BaseURI + '/ApplicationUser/Login', formData
    ).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        this.userName = payLoad.unique_name;
        localStorage.setItem('userName', this.userName);  
        this.isLoginSubject.next(true);
        this.router.navigateByUrl('/home');
        window.location.reload();
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      });
  }

  isAdmin() {
    this.userName = localStorage.getItem('userName');
    if (this.userName != undefined)
      if (this.userName == "admin")
        return true;
      else
        false;
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
    this.router.navigateByUrl('/login');   
    localStorage.removeItem('adminname');
    localStorage.removeItem('delayTime');
    localStorage.removeItem('tv_token');   
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  postUser(formData: User) {      
    return this.http.post(this.BaseURI + '/ApplicationUser/Register/', formData);
  }

  putUser(formData: User) {
    return this.http.put(this.BaseURI + '/ApplicationUser/Update/', formData);
  }

  getUserList() {    
    this.http.get(this.BaseURI + '/ApplicationUser/GetUsers/')
      .toPromise().then(res => this.userList = res as User[]);
  }  

  deleteUser(id: string) {   
    return this.http.delete(this.BaseURI + '/ApplicationUser/Delete?id=' + id);
  }
}