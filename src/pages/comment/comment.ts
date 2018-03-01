import { DetailMediaPage } from '../detail-media/detail-media';
import { UserProvider } from './../../providers/user/user';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  id;
  username;
  title;
  description;
  comments: any = [];
  commentArr: any;
  newComment;
  myComment: boolean;
  numberOfCommnent;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private userProvider: UserProvider) {

    this.id = navParams.get('mediaId');
    this.username = navParams.get('username');
    this.title = navParams.get('title');
    this.description = navParams.get('des');

  }

  ionViewDidLoad() {
    this.getAllComment();
  }

  postComment() {
    const comment = {
      file_id: this.id,
      comment: this.newComment
    };
    this.mediaProvider.postComment(comment).subscribe(res => {
      this.getAllComment();
      this.newComment = '';
    })
  }

  getAllComment() {
    this.mediaProvider.getComment(this.id).subscribe((res: any) => {
      this.comments = res;
      this.numberOfCommnent = this.comments.length;
      console.log(this.numberOfCommnent);
      for (let cmt of this.comments) {
        this.userProvider.getAllUserInfo(cmt.user_id).subscribe(res => {
          this.commentArr = res;
          for (let i in this.comments) {
            if (this.comments[i].user_id == res['user_id']) {
              this.comments[i].username = res['username'];
            }
          }
        })
      }
    })
  }

  backButtonClick() {
    
  }

}
