import { UploadMediaPage } from './../upload-media/upload-media';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UploadMediaPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
