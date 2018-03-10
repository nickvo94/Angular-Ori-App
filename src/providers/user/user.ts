import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {

  logged = false;
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  my_id;

  constructor(public http: HttpClient) {
  }

  //Request information about current user
  getUserData(token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.baseUrl + 'users/user', settings);
  }

  //Request Other User information
  getAllUserInfo(userId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.baseUrl + 'users/' + userId, settings);
  }

  /*-------------------- REQUEST LIST OF MEDIA FILES --------------------*/
  getMediaOfCurrentUser() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.baseUrl + 'media/user', settings);
  }

  getMediaOfOtherUser(userId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.baseUrl + 'media/user/' + userId, settings);
  }

  //Check if a username already exists
  checkUsername(username) {
    return this.http.get(this.baseUrl + 'users/username/' + username);
  }

  /*-------------------- EDIT --------------------*/
  editProfile(user) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.put(this.baseUrl + 'users', user, settings);
  }

  /*-------------------- SIGN-IN --- SIGN-UP --- LOGOUT --------------------*/
  register(user) {
    return this.http.post(this.baseUrl + 'users', user);
  }

  login(user) {
    // optional
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post(this.baseUrl + 'login', user, settings);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
