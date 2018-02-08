import { SignUpPage } from './../sign-up/sign-up';
import { UserProvider } from './../../providers/user/user';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  tabsPage = TabsPage;
  signUpPage = SignUpPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
     if (localStorage.getItem('token')) {
      this.userProvider.hasValidToken().subscribe(response => {
        this.navCtrl.push(this.tabsPage);
      }, err => {
        console.log('error validate login token');
      });
    }
  }

createAccount() {
    this.navCtrl.push(this.signUpPage);
  }


  goToHomePage() {
    this.userProvider.login();
    this.navCtrl.push(this.tabsPage);
  }

}
