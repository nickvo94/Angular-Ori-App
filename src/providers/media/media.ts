import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get(this.baseUrl + 'media');
  }

  getMediaById(id) {
    return this.http.get(this.baseUrl + 'media/' + id);
  }

  deleteMedia(fileId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.delete(this.baseUrl + 'media/' + fileId, settings)
  }

  getUserInfo(userId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.baseUrl + 'users/' + userId, settings);
  }

  getComment(fileId) {
    return this.http.get(this.baseUrl + 'comments/file/' + fileId);
  }

  getLike(fileId) {
    return this.http.get(this.baseUrl + 'favourites/file/' + fileId);
  }

}
