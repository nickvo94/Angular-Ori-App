import { DetailMediaPage } from './../detail-media/detail-media';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaProvider } from './../../providers/media/media';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-other-profile',
  templateUrl: 'other-profile.html',
})
export class OtherProfilePage {

  username;
  email;
  user_id;
  mediaArray: any = [];
  avatar_url = "https://api.adorable.io/avatars/100/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private mediaProvider: MediaProvider) {

    this.user_id = this.navParams.get('userId');
    console.log(this.user_id);
  }

  ionViewDidLoad() {
    //get user information
    this.userProvider.getAllUserInfo(this.user_id).subscribe(res => {
      this.username = res['username'];
      this.email = res['email'];
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    this.getMediaOtherUser();
  }

  //get list of files by user_id
  getMediaOtherUser() {
    this.userProvider.getMediaOfOtherUser(this.user_id).subscribe((res: any) => {
      this.mediaArray = res.reverse();
    });
  }

  //open detail page by file_id
  openDetailMedia(file_id, user_id) {
    this.navCtrl.push(DetailMediaPage, {
      mediaId: file_id,
      userId: user_id
    });
  }
}
