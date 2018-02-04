import { Component } from '@angular/core';

/**
 * Generated class for the PagesUploadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pages-upload',
  templateUrl: 'pages-upload.html'
})
export class PagesUploadComponent {

  text: string;

  constructor() {
    console.log('Hello PagesUploadComponent Component');
    this.text = 'Hello World';
  }

}
