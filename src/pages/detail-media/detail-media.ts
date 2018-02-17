import { HttpErrorResponse } from '@angular/common/http';
import { MediaProvider } from './../../providers/media/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  url: string;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.mediaProvider.getMediaById(this.navParams.get('mediaId')).
      subscribe(response => {
        console.log(response);
        this.url = this.mediaProvider.mediaUrl + response['filename'];
        this.title = response['title'];
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });

  }
}