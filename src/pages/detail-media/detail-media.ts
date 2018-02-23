import { HttpErrorResponse } from '@angular/common/http';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Like } from '../../app/models/like';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { Comment } from '../../app/models/comment';

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

  public id;
         userId;

  like: Like = {file_id: 0};
  createComment: Comment = {file_id: 0, comment:''};

  commentArr: any = [];
  likeArr: any = [];
  numberOfComment: any;
  numberOfLike: any;
  url: string;
  title: string;
  descrpt: any;
  uName: any;
  likeUsers: any = [];
  commentBody: any = [];
  commentUsernames: any = [];
  type:any;    

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.id = navParams.get('mediaId');
    this.userId = navParams.get('userId');
    console.log(this.id, this.userId);
    this.getNumberOfComment();
    this.getNumberOfLike();  
  }

  ionViewDidLoad() {
    this.mediaProvider.getMediaById(this.navParams.get('mediaId')).
      subscribe(response => {
        console.log(response);
        this.url = this.mediaProvider.mediaUrl + response['filename'];
        this.title = response['title'];
        this.descrpt = response['description'];
        this.type = response['media_type'];
        console.log(this.type);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });

      this.mediaProvider.getUserInfo(this.userId).subscribe(res => {
        this.uName = res['username'];
        console.log(this.uName);
      });

     
  }

  callComment(){
    this.createComment.file_id = Number(this.id);
    console.log(this.createComment);
    this.mediaProvider.postComment(this.createComment).subscribe(data => {
      console.log(data);
      this.getNumberOfComment();
    });
  }
  

  getNumberOfComment() {    
      this.mediaProvider.getComment(this.id).subscribe(res => {
        console.log(res);
        this.commentBody = [];
        this.commentUsernames = [];
        this.commentArr = res;        
        this.numberOfComment = this.commentArr.length;
        
        /*
        for(var i = 0; i< (this.numberOfComment); i++ ){
          console.log(res[i]['user_id'], i)
          this.commentUsers.push(res[i]['comment']);
          this.mediaProvider.getUserInfo(res[i]['user_id']).subscribe(data =>{
            console.log(data['username']);            
            this.commentUsernames.push(data['username']);
            console.log(this.commentUsernames);
          });
        }
        */
        
        // Fill Usernames with userID, so the asynchronous callback
        //  knows which index to replace with the correct user name string
        for(var i = 0; i< (this.numberOfComment); i++ ) {
          this.commentUsernames[i] = res[i]['user_id'];
        }                
        console.log(this.commentUsernames);
        for(var i = 0; i< (this.numberOfComment); i++ ){
          var array_idx = i;
          var count = 0;
          console.log(res[i]['user_id'], i)
          this.commentBody.push(res[i]['comment']);
          this.mediaProvider.getUserInfo(res[i]['user_id']).subscribe(data => 
            {
                for (var i = 0; i< (this.numberOfComment); i++ )
                {
                  if (this.commentUsernames[i] === data['user_id']) {
                    this.commentUsernames[i] = data['username'];
                  }
                }
            });
        }
        // for(var i = 0; i< (this.numberOfComment); i++ ){
        //   //this.commentUsers.push(res[i]['comment']);
                   
        // }
        console.log(this.commentUsernames);
        console.log(this.numberOfComment, res, this.commentBody);
      });
      
    
  }

  getNumberOfLike() {
      this.mediaProvider.getLike(this.id).subscribe(data => {
        console.log(data);
        this.likeArr = data;
        this.likeUsers = [];
        this.numberOfLike = this.likeArr.length;
        
        for(var i = 0; i< (this.numberOfLike); i++ ){
          this.mediaProvider.getUserInfo(data[i]['user_id']).subscribe(data =>{            
            this.likeUsers.push(data['username']);
            console.log(this.likeUsers);
          });        
        }                
        console.log(this.numberOfLike, data, this.likeUsers);        
      });    
  }

  clickLike(){
    this.like.file_id = Number(this.id);
    console.log(this.like);
    this.mediaProvider.postLike(this.like).subscribe(response => {
      console.log(response);
      this.getNumberOfLike();
    },(error: HttpErrorResponse)=>{
       console.log(error['statusText']);
       if(error['statusText'] == 'Bad Request'){
         this.mediaProvider.deleteLike(this.id).subscribe(Response => {
           console.log(Response);
           this.getNumberOfLike();
         })
       }
    });
  }
  
  public iconCommentClicked: boolean = false; //Whatever you want to initialise it as
         CommentClicked: boolean = false;
         likeClicked: boolean = false;

  public onIconCommentClick() {    
      this.iconCommentClicked = !this.iconCommentClicked;
  }
  public onCommentClick() {    
    this.CommentClicked = !this.CommentClicked;    
  }
  public onLikeClick() {    
    this.likeClicked = !this.likeClicked;
  }
  
  callDeleteComment(comment_id){
    console.log(comment_id);
    this.mediaProvider.deleteComment(comment_id).subscribe(data => { 
      console.log(data);
      this.getNumberOfComment();    
    })
  }
}