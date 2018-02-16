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
          for (let i in this.medias) {
            if (this.medias[i].user_id == res.user_id) {
              this.medias[i].username = res.username;
            }
          }
        })
      }
    });
  }

  getNumberOfComment() {
    for (let file of this.medias) {
      this.mediaProvider.getComment(file.file_id).subscribe(res => {
        this.numberOfComment = res.length;
        file.numberOfComment = this.numberOfComment;
      })
    }
  }

  getNumberOfLike() {
    for (let file of this.medias) {
      this.mediaProvider.getLike(file.file_id).subscribe(res => {
        this.numberOfLike = res.length;
        file.numberOfLike = this.numberOfLike;
      })
    }
  }

  openDetailMedia(id) {
    this.navCtrl.push(DetailMediaPage, {
      mediaId: id
    })
  }
}
