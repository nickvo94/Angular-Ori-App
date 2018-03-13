import { CommentPage } from './../comment/comment';
import { OtherProfilePage } from './../other-profile/other-profile';
import { ProfilePage } from './../profile/profile';
import { DetailMediaPage } from './../detail-media/detail-media';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProvider } from './../../providers/user/user';
import { MediaProvider } from './../../providers/media/media';
import { Component, ViewChild } from '@angular/core';
import { InfiniteScroll, NavController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { Search } from '../../app/models/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  medias: any = [];
  OriArray: any = [];
  searchArray: any = [];
  numberOfComment: any;
  numberOfLike: any;
  currentUser_id;
  start: number = 0;
  doLoadMore: boolean = true;
  toggled: boolean = false;
  search: Search = { title: '' };
  likeArr: any;
  tagArr: any;
  avatar_url = "https://api.adorable.io/avatars/40/";


  constructor(public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private userProvider: UserProvider) {

  }

  ionViewDidLoad() {
    if (localStorage.getItem('token') !== null) {
      this.userProvider.getUserData(localStorage.getItem('token')).
        subscribe(response => {
          this.currentUser_id = response['user_id'];
          this.userProvider.my_id = response['user_id'];
          this.userProvider.logged = true;
          localStorage.setItem('user', JSON.stringify(response));
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
    }
    this.getAllMedia();
    //this.getOriPost();
  }

  //auto update number of commnent/like
  ionViewWillEnter() {
    this.getNumberOfComment();
    this.getNumberOfLike();
    //reload homepage
    if (this.mediaProvider.reload) {
      this.medias = [];
      //this.getOriPost();
      this.start = 0;
      this.getAllMedia();
      this.mediaProvider.reload = false;
    }
  }

  //back to top
  scrollToTop() {
    this.content.scrollToTop();
  }

  //get number of media files providing a starting and limit number
  getAllMedia() {
    this.mediaProvider.getAllMedia(this.start, 10).subscribe((data: any) => {
      this.medias = data;
      this.getNumberOfComment();
      this.getNumberOfLike();
      this.getUsername();
    });
  }

  //get only Ori media files by tag
  getOriPost() {
    const tag = encodeURIComponent("#ori");
    this.mediaProvider.getPostByTag(tag).subscribe((res: any) => {
      this.OriArray = res;
      //this.medias = res;
      this.getNumberOfComment();
      this.getNumberOfLike();
      this.getUsername();
    });
  }

  //get username each files
  getUsername() {
    for (let user of this.medias) {
      this.userProvider.getAllUserInfo(user.user_id).subscribe(res => {
        for (let i in this.medias) {
          if (this.medias[i].user_id == res['user_id']) {
            this.medias[i].username = res['username'];
          }
        }
      });
    }
  }

  //count number of commnents by file_id
  getNumberOfComment() {
    for (let file of this.medias) {
      this.mediaProvider.getComment(file.file_id).subscribe(res => {
        this.numberOfComment = res;
        file.numberOfComment = this.numberOfComment.length;
      })
    }
  }

  //count number of likes by file_id
  getNumberOfLike() {
    for (let file of this.medias) {
      this.mediaProvider.getLike(file.file_id).subscribe(res => {
        this.likeArr = res;
        this.numberOfLike = res;
        file.numberOfLike = this.numberOfLike.length;
        file.like = false;
        file.likePost = "heart-outline";
        //Display whether current user has liked or not
        for (let i in this.likeArr) {
          if (this.likeArr[i].user_id == this.currentUser_id) {
            file.like = true;
            file.likePost = "heart";
          }
        }
      });
    }
  }

  clickLike(id, isLiked) {
    const like = {
      file_id: id
    };
    if (isLiked == false) {
      this.mediaProvider.postLike(like).subscribe(response => {
        this.getNumberOfLike();
      })
    } else {
      this.mediaProvider.deleteLike(id).subscribe(Response => {
        this.getNumberOfLike();
      })
    }
  }

  //open detail page by file_id
  openDetailMedia(id, user_id) {
    this.navCtrl.push(DetailMediaPage, {
      mediaId: id,
      userId: user_id,
    })
  }

  //open user profile page by user_id
  openOtherUser(user_id) {
    if (user_id !== this.currentUser_id) {
      this.navCtrl.push(OtherProfilePage, {
        userId: user_id
      })
    } else {
      this.navCtrl.push(ProfilePage);
    }
  }

  //open comment page by file_id
  openComment(id, username, title, description) {
    this.navCtrl.push(CommentPage, {
      mediaId: id,
      username: username,
      title: title,
      des: description
    });
  }

  //load more media files providing a starting and limit number
  doInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.start = this.medias.length;
      if (this.doLoadMore) {
        this.mediaProvider.getAllMedia(this.start, 10).subscribe((data: any) => {
          this.medias = this.medias.concat(data);
          this.getNumberOfComment();
          this.getNumberOfLike();
          this.getUsername();
        });
        infiniteScroll.complete();
      }
    }, 2500);
    //limit number of media files (changeable)
    if (this.medias.length > 50) {
      this.doLoadMore = false;
    }
  }

  //pull to refresh page
  doRefresh(refresher) {
    setTimeout(() => {
      this.medias = [];
      //this.getOriPost();
      this.start = 0;
      this.getAllMedia();
      this.doLoadMore = true;
      refresher.complete();
    }, 2000);
  }

  public toggle() {
    console.log('search call', this.toggled)
    this.toggled = this.toggled ? false : true;
  }

  //check search input, then get list of result files by title
  onInputSearch(myInput) {
    this.searchArray = [];
    this.search.title = String(myInput);
    if (myInput !== '') {
      this.mediaProvider.postSearch(this.search).subscribe(data => {
        this.searchArray = data;
      });
    }
  }

  //open detail page of 1st search result 
  onSearchEnter(myInput) {
    if (myInput !== '') {
      this.openDetailMedia(this.searchArray[0].file_id, this.searchArray[0].user_id);
    } else {
      this.onCancle();
    }
  }

  //cancle search
  onCancle() {
    console.log('Cancle');
  }

}
