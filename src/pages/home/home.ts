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
  numberOfComment: any;
  numberOfLike: any;
  mediaArray: any;


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
    this.mediaProvider.getAllMedia().subscribe((data: any) => {
      console.log(data['user_id']);
      this.medias = data;
      this.getNumberOfComment();
      this.getNumberOfLike();
      for (let user of this.medias) {
        this.mediaProvider.getUserInfo(user.user_id).subscribe(res => {
          this.mediaArray = res;
          for (let i in this.medias) {
            if (this.medias[i].user_id == this.mediaArray.user_id) {
              this.medias[i].username = this.mediaArray.username;
            }
          }
        })
      }
    });
  }

  getNumberOfComment() {
    for (let file of this.medias) {
      this.mediaProvider.getComment(file.file_id).subscribe(res => {
        this.numberOfComment = res;
        file.numberOfComment = this.numberOfComment.length;
      })
    }
  }

  getNumberOfLike() {
    for (let file of this.medias) {
      this.mediaProvider.getLike(file.file_id).subscribe(res => {
        this.numberOfLike = res;
        file.numberOfLike = this.numberOfLike.length;
      })
    }
  }

  openDetailMedia(id) {
    this.navCtrl.push(DetailMediaPage, {
      mediaId: id
    })
  }
}
