import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user :any;
  loading: any;
  loginpage = { email: '', password: ''};

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
   }

  login()
  {

    this.user = JSON.parse(localStorage.getItem('testObject'));
    // if user has done signup process
    if(this.user)
    {
      this.showLoader();
      
      this.loading.dismiss();
        if((this.user.Email == this.loginpage.email || this.user.UserName == this.loginpage.email ) && this.user.password == this.loginpage.password){
            this.navCtrl.push(TabsPage);
        }
      
        else{
        {
        let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Either Username or Password os wrong",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              
             
            }
          }
        ]
      });
     alert.present();
    }
      }
    }
     // if user has not done signup process
    else{
      {
      const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: "User has not Registered.",
      buttons: ['OK']
    });
    alert.present();
        
       }
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
