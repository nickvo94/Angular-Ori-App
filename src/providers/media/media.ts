import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MediaProvider {

  reload: boolean = false;
  reloadProfile: boolean = false;
  saved: any = [];
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public http: HttpClient) {
  }

  /*-------------------- MEDIA --------------------*/
  //Get number of media files providing a starting and limit number
  getAllMedia(start, end) {
    return this.http.get(this.baseUrl + 'media?start=' + start + '&limit=' + end);
  }

  //Get a single media file based on file id
  getMediaById(id) {
    return this.http.get(this.baseUrl + 'media/' + id);
  }

  //Delete media file
  deleteMedia(fileId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.delete(this.baseUrl + 'media/' + fileId, settings)
  }

  //Upload a media file
  uploadFile(media) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'media', media, settings);
  }

  /*-------------------- TAG --------------------*/
  //Create tag for a file
  postTag(tag) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'tags', tag, settings);
  }

  //Delete a tag by id
  deleteTag(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.delete(this.baseUrl + 'tags/' + id, settings);
  }

  //Get files by tag
  getPostByTag(tag: any) {
    return this.http.get(this.baseUrl + 'tags/' + tag);
  }

  //Get tags by file id
  getTagbyFileId(id) {
    return this.http.get(this.baseUrl + 'tags/file/' + id);
  }

  /*-------------------- FAVOURITE --------------------*/
  //Create a favourite for a file based on file id
  postLike(like) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'favourites', like, settings);
  }

  //Get all favourites of a file based on file id
  getLike(fileId) {
    return this.http.get(this.baseUrl + 'favourites/file/' + fileId);
  }

  //Delete a favourite from a file based on file id
  deleteLike(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.delete(this.baseUrl + 'favourites/file/' + id, settings);
  }

  /*-------------------- COMMENT --------------------*/
  //Create comment for a file
  postComment(comment) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'comments', comment, settings);
  }

  //Delete comment by comment id
  deleteComment(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.delete(this.baseUrl + 'comments/' + id, settings);
  }

  //Get comments by file id
  getComment(fileId) {
    return this.http.get(this.baseUrl + 'comments/file/' + fileId);
  }

  /*-------------------- SEARCH --------------------*/
  postSearch(search) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.baseUrl + 'media/search/', search, settings);
  }

}
