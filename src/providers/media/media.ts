import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

<<<<<<< HEAD
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  apiUrl_user = 'http://media.mw.metropolia.fi/wbma/users/user';
  apiUrl_media = 'http://media.mw.metropolia.fi/wbma/media';
=======
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

>>>>>>> 6726df10a36f89e05d2c25aa70764d8f68d4b2c8

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

<<<<<<< HEAD
  public uploadFile(media){
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    console.log(settings);
    console.log(this.http.post(this.apiUrl_media, media, settings));
    return this.http.post(this.apiUrl_media, media, settings);
  }

  public getAllMedia(){
    return this.http.get(this.apiUrl + '/media');
=======
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
>>>>>>> 6726df10a36f89e05d2c25aa70764d8f68d4b2c8
  }

}
