import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  username: string;
  password: string;
  status: string;
  email: string;
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  hasValidToken() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.baseUrl + 'users/user', settings);
  }

  register() {
    const body = {
      username: this.username,
      password: this.password,
      email: this.email
    };
    this.http.post(this.baseUrl + 'users', body).subscribe(data => {
      console.log(data);
      this.login();
    });
  }

  login() {
    const body = {
      username: this.username,
      password: this.password
    };
    // optional
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    this.http.post(this.baseUrl + 'login', body, settings).subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.status = error.error.message;
    });
  }

}
