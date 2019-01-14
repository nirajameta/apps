import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';



/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    var user = JSON.parse(localStorage.getItem('testObject'));
    if(user){
      console.log("value")
    }
    else{
      console.log("No value")
    }

   
  }

  registration(){
   
    this.navCtrl.push(RegistrationPage);
  }

  login(){
   
    this.navCtrl.push(LoginPage);
  }

}
