import { ProfilePage } from './../profile/profile';
import { OtherProfilePage } from './../other-profile/other-profile';
import { UserProvider } from './../../providers/user/user';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-like',
  templateUrl: 'like.html',
})
export class LikePage {

  id;
  my_id;
  likeArr: any = [];
  avatar_url = "https://api.adorable.io/avatars/40/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private userProvider: UserProvider) {

    this.id = navParams.get('mediaId');
    this.my_id = this.userProvider.my_id;
  }

  ionViewDidLoad() {
    this.getLikeUser();
  }

  //get list of users who liked by file_id
  getLikeUser() {
    this.mediaProvider.getLike(this.id).subscribe((res: any) => {
      this.likeArr = res;
      for (let user of this.likeArr) {
        this.userProvider.getAllUserInfo(user['user_id']).subscribe(data => {
          for (let i in this.likeArr) {
            if (this.likeArr[i].user_id == data['user_id']) {
              this.likeArr[i].username = data['username'];
            }
          }
        });
      }
    });
  }

  //open user profile page
  openOtherUser(user_id) {
    if (user_id !== this.my_id) {
      this.navCtrl.push(OtherProfilePage, {
        userId: user_id
      });
    } else {
      this.navCtrl.push(ProfilePage);
    }
  }

}
