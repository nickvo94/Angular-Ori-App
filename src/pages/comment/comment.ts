import { ProfilePage } from './../profile/profile';
import { OtherProfilePage } from './../other-profile/other-profile';
import { UserProvider } from './../../providers/user/user';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  id;
  my_id;
  username;
  title;
  description;
  comments: any = [];
  newComment;
  myComment: boolean;
  avatar_url = "https://api.adorable.io/avatars/40/";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private userProvider: UserProvider,
    private alertCtrl: AlertController) {

    this.id = navParams.get('mediaId');
    this.username = navParams.get('username');
    this.title = navParams.get('title');
    this.description = navParams.get('des');
    this.my_id = this.userProvider.my_id;
  }

  ionViewDidLoad() {
    this.getAllComment();
  }

  //add a new comment
  postComment() {
    const comment = {
      file_id: this.id,
      comment: this.newComment
    };
    this.mediaProvider.postComment(comment).subscribe(res => {
      this.getAllComment();
      this.newComment = '';
    });
  }

  //show popup to confirm detele comment
  deleteComment(cmt_id, cmt) {
    let alert = this.alertCtrl.create({
      subTitle: 'Delete this comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.mediaProvider.deleteComment(cmt_id).subscribe(res => {
              console.log(res['message']);
              this.comments.splice(this.comments.indexOf(cmt), 1);
            });
          }
        }
      ]
    });
    alert.present();
  }

  //get list of comments by file_id
  getAllComment() {
    this.mediaProvider.getComment(this.id).subscribe((res: any) => {
      this.comments = res;
      //get username of comment
      for (let cmt of this.comments) {
        this.userProvider.getAllUserInfo(cmt.user_id).subscribe(res => {
          for (let i in this.comments) {
            if (this.comments[i].user_id == res['user_id']) {
              this.comments[i].username = res['username'];
            }
          }
        });
      }
    });
  }

  //navigate to user profile page
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
