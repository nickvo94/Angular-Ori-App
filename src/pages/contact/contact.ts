import { LogInPage } from './../log-in/log-in';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  loginPage = LogInPage;

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {

  }

  logout(){
    this.userProvider.logout();
    this.navCtrl.setRoot(this.loginPage);
  }

}
