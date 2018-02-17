import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Provider } from '@angular/core/src/di/provider';
import { MediaProvider } from '../../providers/media/media';
import { HttpErrorResponse } from '@angular/common/http/src/response';

/**
 * Generated class for the UploadMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-media',
  templateUrl: 'upload-media.html',
})
export class UploadMediaPage {
  file: File;  
  //media = new Media(this.file, '', '');

  constructor(private mediaProvider: MediaProvider) { }

  setFile(evt){
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
    
  }

  startUpload(){
    //Create FormData object
    //add title & discription, add file,send FormData obj

    const form: FormData = new FormData();
    form.append('file',this.file);
    // form.append('title',this.media.title);
    // form.append('description',this.media.description);
    // console.log(form);
    // console.log(this.media);
    
      
    this.mediaProvider.uploadFile(form).subscribe(data => {
      console.log(data);
    },(e:HttpErrorResponse) => {
      console.log(e);
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadMediaPage');
  }

}
