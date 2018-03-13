import { User } from '../../app/models/user';
import { LogInPage } from '../log-in/log-in';
import { DetailMediaPage } from './../detail-media/detail-media';
import { MediaProvider } from './../../providers/media/media';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userId;
  username;
  email;
  user: User = { username: '', password: '', email: '' };
  listMedia: string;
  myMediaArray: any = [];
  mySavedArray: any = [];
  tag_content: string;
  avatar_url = "https://api.adorable.io/avatars/100/";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private mediaProvider: MediaProvider,
    private app: App,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.listMedia = "myPost";
    //get current user information
    if (localStorage.getItem('token') !== null) {
      this.userProvider.getUserData(localStorage.getItem('token')).subscribe(res => {
        this.userId = res['user_id'];
        this.tag_content = "#myori" + this.userId;
        this.getSavedPost();
        this.username = res['username'];
        this.email = res['email'];
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
    }
    this.getMediaCurrentUser();
  }

  //auto update when add/delete or save/unsave files
  ionViewWillEnter() {
    if (this.mediaProvider.reloadProfile) {
      this.getMediaCurrentUser();
      this.getSavedPost();
      this.mediaProvider.reloadProfile = false
    }
  }

  //get list of files of current user
  getMediaCurrentUser() {
    this.userProvider.getMediaOfCurrentUser().subscribe((res: any) => {
      this.myMediaArray = res.reverse();
    });
  }

  //get list of saved files of current user
  getSavedPost() {
    const tag = encodeURIComponent(this.tag_content);
    this.mediaProvider.getPostByTag(tag).subscribe((res: any) => {
      console.log(res)
      this.mySavedArray = res.reverse();
    });
  }

  //open detail page by file_id
  openDetailMedia(file_id, user_id) {
    this.navCtrl.push(DetailMediaPage, {
      mediaId: file_id,
      userId: user_id
    });
  }

  //show popup with inputs to edit current user info
  editProfile() {
    let alert = this.alertCtrl.create({
      title: 'Edit Profile',
      inputs: [
        {
          name: 'username',
          value: this.username,
          placeholder: 'New username',
        },
        {
          name: 'password',
          placeholder: 'New password',
          type: 'password'
        },
        {
          name: 'email',
          value: this.email,
          type: 'email',
          placeholder: 'New email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          handler: data => {
            console.log(data)
            this.checkUsername(data.username);
            if (data.username != '' && data.password != '' && data.email != '') {
              this.userProvider.editProfile(data).subscribe(res => {
                this.username = data.username;
                this.showPopup("", "User data updated")
              });
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  //Check if new username already exists
  checkUsername(username) {
    if (username !== this.username) {
      this.userProvider.checkUsername(username).subscribe(res => {
        switch (res['available']) {
          case true:
            break;
          case false:
            this.showPopup("Fail", "username already exists");
            break
        }
      });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  //show popup to confirm delete post
  deletePost(file_id, post) {
    let alert = this.alertCtrl.create({
      subTitle: 'Delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.mediaProvider.deleteMedia(file_id).subscribe(res => {
              console.log(res['message']);
              this.myMediaArray.splice(this.myMediaArray.indexOf(post), 1);
              this.mediaProvider.reload = true;
            });
          }
        }
      ]
    });
    alert.present();
  }

  //show popup to confirm logout
  logout() {
    let alert = this.alertCtrl.create({
      subTitle: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.userProvider.logout();
            this.app.getRootNav().setRoot(LogInPage);
          }
        }
      ]
    });
    alert.present();
  }
}
