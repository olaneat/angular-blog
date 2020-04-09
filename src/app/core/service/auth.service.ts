import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginDetail, SignUpDetail } from '../models/auth.model';
import {Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerUrl = 'https://eblog-api.encentrals.com/api/users';
  loginUrl = 'https://eblog-api.encentrals.com/api/users/login';


  constructor(private http: HttpClient ) { }

  registerUser(signUp: SignUpDetail): Observable<any> {
   return this.http.post<{token: string}>(this.registerUrl, signUp);
  }

  userLogin(login: LoginDetail) {
    return this.http.post<{token: string}>(this.loginUrl, login).pipe(tap(res => {localStorage.setItem('token', res.token)}));
  }

  logOut(){
    localStorage.removeItem('token');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('token') !== null;
  }
}
