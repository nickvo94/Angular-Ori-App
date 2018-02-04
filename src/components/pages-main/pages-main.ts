import { Component } from '@angular/core';

/**
 * Generated class for the PagesMainComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pages-main',
  templateUrl: 'pages-main.html'
})
export class PagesMainComponent {

  text: string;

  constructor() {
    console.log('Hello PagesMainComponent Component');
    this.text = 'Hello World';
  }

}
