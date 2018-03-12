import { LikePage } from './../like/like';
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
  saveClicked: boolean;
  numberOfComment: any;
  numberOfLike: any;
  url: string;
  title: string;
  description: any;
  username: any;
  time;
  type: any;
  likePost: string = "heart-outline";
  likeClicked: boolean;
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
    //Get chosen file
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
    //get username of chosen file
    this.userProvider.getAllUserInfo(this.userId).subscribe(res => {
      this.username = res['username'];
    });
    this.myId = this.userProvider.my_id;
    this.getNumberOfLike();
    this.tag_content = "#myori" + this.myId;
    this.checkIsSaved();
  }

  ionViewWillEnter() {
    this.getNumberOfComment();
  }

  //count number of comments
  getNumberOfComment() {
    this.mediaProvider.getComment(this.id).subscribe(res => {
      this.commentArr = res;
      this.numberOfComment = this.commentArr.length;
    });
  }

  //count number of likes
  getNumberOfLike() {
    this.mediaProvider.getLike(this.id).subscribe(data => {
      this.likeArr = data;
      this.checkIsLiked();
      this.numberOfLike = this.likeArr.length;
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
        this.likeClicked = true;
      })
    } else {
      this.mediaProvider.deleteLike(this.id).subscribe(Response => {
        this.getNumberOfLike();
        this.likePost = "heart-outline";
        this.likeClicked = false;
      })
    }
  }

  //Display whether current user has liked or not
  checkIsLiked() {
    this.likeClicked = false;
    this.likePost = "heart-outline";
    for (let i in this.likeArr) {
      if (this.likeArr[i].user_id == this.myId) {
        this.likeClicked = true;
        this.likePost = "heart";
      }
    }
  }

  //open the comment page
  onIconCommentClick() {
    this.navCtrl.push(CommentPage, {
      mediaId: this.id,
      username: this.username,
      title: this.title,
      des: this.description
    });
  }

  //open list of users who liked this post
  openLikeUser() {
    this.navCtrl.push(LikePage, {
      mediaId: this.id,
    });
  }

  //show popup to confirm deleting post only when current user is the author
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

  //open user profile page
  openOtherUser() {
    if (this.userId !== this.myId) {
      this.navCtrl.push(OtherProfilePage, {
        userId: this.userId
      });
    } else {
      this.navCtrl.push(ProfilePage);
    }
  }

  savePost() {
    const tag = {
      file_id: this.id,
      tag: this.tag_content
    };
    //create specific tag to save post
    if (this.saveClicked == false) {
      this.mediaProvider.postTag(tag).subscribe(res => {
        this.checkIsSaved();
      });
    } else {
      this.mediaProvider.deleteTag(this.tagId).subscribe(res => {
        this.checkIsSaved();
      });
    }
    this.mediaProvider.reloadProfile = true;
  }

  //Display whether current user has saved or not
  checkIsSaved() {
    this.mediaProvider.getTagbyFileId(this.id).subscribe(res => {
      this.tagArr = res;
      this.saveClicked = false;
      for (let i in this.tagArr) {
        if (this.tagArr[i].tag == this.tag_content) {
          this.saveClicked = true;
          this.tagId = this.tagArr[i].tag_id;
        }
      }
    });
  }

}