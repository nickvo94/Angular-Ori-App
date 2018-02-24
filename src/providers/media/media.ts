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

  postTag(tag) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'tags', tag, settings);
  }

  uploadFile(media) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'media', media, settings);
  }

  postLike(like) {
    console.log(like);
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post('http://media.mw.metropolia.fi/wbma/favourites', like, settings);
  }

  deleteLike(id) {
    console.log(id);
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.delete('http://media.mw.metropolia.fi/wbma/favourites/file/' + id, settings);
  }

  postComment(comment) {
    console.log(comment);
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    console.log(this.http.post('http://media.mw.metropolia.fi/wbma/comments', comment, settings));
    return this.http.post('http://media.mw.metropolia.fi/wbma/comments', comment, settings);
  }

  deleteComment(commentId){
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.delete('http://media.mw.metropolia.fi/wbma/comments/' + commentId, settings);
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
