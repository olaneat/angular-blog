import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {LoginDetail, SignUpDetail } from 'src/app/core/models/auth.model';
import {Router } from '@angular/router';
import {Observable, throwError } from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerUrl = 'https://eblog-api.encentrals.com/api/users';
  loginUrl = 'https://eblog-api.encentrals.com/api/users/login';
  profileUrl = 'https://eblog-api.encentrals.com/api/profiles';
  login: LoginDetail[];
  register: SignUpDetail[];
  headers = new HttpHeaders().set('content-Type', 'application/json');
  currentUser = {};


  constructor(private http: HttpClient, public router: Router ) { }

  registerUser(register): Observable<any>{
    return this.http.post<{access_token: string}>(this.registerUrl, register).pipe(tap(res => {this.userLogin(this.login); }));
  }

//  userLogin(login) {
  //  return this.http.post<{token: string}>(this.loginUrl, login).pipe(tap(res => {localStorage.setItem('token', res.token); }));
  // }

  userLogin(login) {
    return this.http.post<any>(this.loginUrl, login)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.router.navigate(['index']);
    });
  }

  logOut(){
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null){
      this.router.navigate(['login']);
    }
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !== null;
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  getProfile(username: string): Observable<any> {
    const url = `${this.profileUrl}/${username}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let err = '';
    if (error.error instanceof ErrorEvent) {
      err = error.error.message;
    } else {
      err = `Error Code: ${error.status}\nMessage : ${error.message}`;

    }
    return throwError(err);
  }
}
