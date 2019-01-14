import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  picture:any;
  user  :any;

  person = { FirstName: '', MiddleName: '', LastName: '', UserName: '', password: '', confirmation_password: '',  Mobile: '', Email: '' };

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public app: App) {

  }

  ionViewDidLoad(){
    this.picture  = localStorage.getItem('ImgUrl')
    this.user = JSON.parse(localStorage.getItem('testObject'));

    // bind all Userdata with profile data
    this.person.FirstName = this.user.FirstName;
    this.person.MiddleName = this.user.MiddleName;
    this.person.LastName = this.user.LastName;
    this.person.UserName = this.user.UserName;
    this.person.password = this.user.password;
    this.person.confirmation_password = this.user.confirmation_password;
    this.person.Mobile = this.user.Mobile;
    this.person.Email = this.user.Email;

  }

  save()
  {
    if (this.person.password != this.person.confirmation_password) {
      this.showPopup("Error", 'The password confirmation does not match.');
    } 
    else
    {
        let alert = this.alertCtrl.create({
        title: "Success",
        subTitle: "Your Profile has been updated Successfully. Please login with updated Credentials",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              localStorage.setItem('testObject', JSON.stringify(this.person));
              var nav = this.app.getRootNav()
                nav.setRoot(LoginPage);
            
            }
          }
        ]
      });
      alert.present();
    }
  }
    
  

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
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




