import { ProfilePage } from './../profile/profile';
import { OtherProfilePage } from './../other-profile/other-profile';
import { CommentPage } from './../comment/comment';
import { UserProvider } from './../../providers/user/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

/**
 * Generated class for the DetailMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-media',
  templateUrl: 'detail-media.html',
})
export class DetailMediaPage {
  @ViewChild(Navbar) navBar: Navbar;

  id;
  userId;
  myId;
  tagId;
  commentArr: any = [];
  likeArr: any = [];
  tagArr: any = [];
  tag_content;
  saveClicked: boolean = false;
  numberOfComment: any;
  numberOfLike: any;
  url: string;
  title: string;
  description: any;
  username: any;
  time;
  likeUsers: any = [];
  type: any;
  likePost: string = "heart-outline";
  likeClicked: boolean = false;
  avatar_url = "https://api.adorable.io/avatars/40/";



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private userProvider: UserProvider,
    private alertCtrl: AlertController) {

    this.id = navParams.get('mediaId');
    this.userId = navParams.get('userId');
  }

  ionViewDidLoad() {
    this.mediaProvider.getMediaById(this.navParams.get('mediaId')).
      subscribe(response => {
        this.url = this.mediaProvider.mediaUrl + response['filename'];
        this.title = response['title'];
        this.description = response['description'];
        this.type = response['media_type'];
        this.time = response['time_added'];
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    this.userProvider.getAllUserInfo(this.userId).subscribe(res => {
      this.username = res['username'];
    });
    this.getNumberOfLike();
    this.myId = this.userProvider.my_id;
    this.tag_content = "#myori" + this.myId;
    this.checkIsSaved();
  }

  ionViewWillEnter() {
    this.getNumberOfComment();
  }

  getNumberOfComment() {
    this.mediaProvider.getComment(this.id).subscribe(res => {
      this.commentArr = res;
      this.numberOfComment = this.commentArr.length;
    });
  }

  getNumberOfLike() {
    this.mediaProvider.getLike(this.id).subscribe(data => {
      this.likeArr = data;
      this.checkIsLiked();
      this.likeUsers = [];
      this.numberOfLike = this.likeArr.length;

      for (var i = 0; i < (this.numberOfLike); i++) {
        this.userProvider.getAllUserInfo(data[i]['user_id']).subscribe(data => {
          this.likeUsers.push(data['username']);
        });
      }
    });
  }

  clickLike() {
    const like = {
      file_id: this.id
    };
    if (!this.likeClicked) {
      this.mediaProvider.postLike(like).subscribe(response => {
        this.getNumberOfLike();
        this.likePost = "heart";
      })
    } else {
      this.mediaProvider.deleteLike(this.id).subscribe(Response => {
        this.getNumberOfLike();
        this.likePost = "heart-outline";
      })
    }
  }

  checkIsLiked() {
    for (let i in this.likeArr) {
      if (this.likeArr[i].user_id == this.myId) {
        this.likeClicked = true;
        this.likePost = "heart";
      } else {
        this.likeClicked = false;
        this.likePost = "heart-outline";
      }
    }
  }

  onIconCommentClick() {
    this.navCtrl.push(CommentPage, {
      mediaId: this.id,
      username: this.username,
      title: this.title,
      des: this.description
    });
  }

  deletePost() {
    let alert = this.alertCtrl.create({
      subTitle: 'Delete this post?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.mediaProvider.deleteMedia(this.id).subscribe(res => {
              console.log(res['message']);
              this.mediaProvider.reloadProfile = true;
              this.navCtrl.pop();
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    alert.present();
  }

  openOtherUser() {
    if (this.userId !== this.myId) {
      this.navCtrl.push(OtherProfilePage, {
        userId: this.userId
      })
    } else {
      this.navCtrl.push(ProfilePage);
    }
  }

  savePost() {
    const tag = {
        file_id: this.id,
        tag: this.tag_content
      };
      if (this.saveClicked == false) {
      this.mediaProvider.postTag(tag).subscribe(res =>{
        console.log(res)
        this.checkIsSaved();
      })
      } else {
        this.mediaProvider.deleteTag(this.tagId).subscribe(res =>{
          console.log(res)
          this.checkIsSaved();
        })
      }
      this.mediaProvider.reloadProfile = true;
  }
  
  checkIsSaved() {
    this.mediaProvider.getTagbyFileId(this.id).subscribe(res =>{
      this.tagArr = res;
      for(let i in this.tagArr) {
        if (this.tagArr[i].tag == this.tag_content) {
          this.saveClicked = true;
          this.tagId = this.tagArr[i].tag_id;
        } else {
          this.saveClicked = false;
        }
      }
    })
  }

}