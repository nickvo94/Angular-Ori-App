import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  apiUrl_user = 'http://media.mw.metropolia.fi/wbma/users/user';
  apiUrl_media = 'http://media.mw.metropolia.fi/wbma/media';

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

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
  }

}
