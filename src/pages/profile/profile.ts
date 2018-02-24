import { DetailMediaPage } from './../detail-media/detail-media';
import { MediaProvider } from './../../providers/media/media';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userId;
  username;
  email;
  fullname;
  listMedia: string;
  myMediaArray: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private mediaProvider: MediaProvider) { }

  ionViewDidLoad() {
    this.listMedia = "myPost";
    if (localStorage.getItem('token') !== null) {
      this.userProvider.getUserData(localStorage.getItem('token')).subscribe(res => {
        this.userId = res['user_id'];
        console.log(this.userId);
        this.username = res['username'];
        this.email = res['email'];
        this.fullname = res['full_name'];
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
    }
    this.getMediaCurrentUser();
  }

  getMediaCurrentUser() {
    this.userProvider.getMediaOfCurrentUser().subscribe((res: any) => {
      this.myMediaArray = res.reverse();
      console.log(this.myMediaArray);
    })
  }

  openDetailMedia(file_id, user_id) {
    this.navCtrl.push(DetailMediaPage, {
      mediaId: file_id,
      userId: user_id
    })
  }

}
