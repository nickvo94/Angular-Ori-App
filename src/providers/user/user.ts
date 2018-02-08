import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  username: string;
  email: string;
  password: string;
 
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

@Injectable()
export class UserProvider {

  currentUser: User;
  
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

  register(user) {
  
      return this.http.post(this.baseUrl + 'users', user);
    }
    // const body = {
    //   username: this.newUser.username,
    //   password: this.newUser.password,
    //   email: this.newUser.email
    // };
    // this.http.post(this.baseUrl + 'users', body).subscribe(data => {
    //   console.log(data);
    //   this.login();
    // });
  

  login(user) {
   
      return this.http.post(this.baseUrl + 'login', user);
    }
    // const body = {
    //   username: this.currentUser.username,
    //   password: this.currentUser.password
    // };
    // // optional
    // const settings = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json')
    // };
    // this.http.post(this.baseUrl + 'login', body, settings).subscribe(response => {
    //   console.log(response['token']);
    //   localStorage.setItem('token', response['token']);
    // }, (error: HttpErrorResponse) => {
    //   console.log(error.error.message);
    //   this.status = error.error.message;
    // });
  

}
