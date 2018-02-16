import { DetailMediaPage } from './../detail-media/detail-media';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProvider } from './../../providers/user/user';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  medias: any[];
  userId;

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider, private userProvider: UserProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
    if (localStorage.getItem('token') !== null) {
      this.userProvider.getUserData(localStorage.getItem('token')).
        subscribe(response => {
          this.userProvider.logged = true;
          localStorage.setItem('user', JSON.stringify(response));
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
    }
      this.getAllMedia();
  }

  getAllMedia() {
    this.mediaProvider.getAllMedia().subscribe((data: any) =>{
      console.log(data['user_id']);
      this.medias = data;
      this.userId = data['user_id'];
      // this.mediaProvider.getUserInfo(this.userId, localStorage.getItem('token')).subscribe(res => {
      //   console.log(res);
      // })
    });
  }

  openDetailMedia(id){
    this.navCtrl.push(DetailMediaPage, {
      mediaId: id
    })
  }
}
