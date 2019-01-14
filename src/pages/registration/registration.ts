import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MainPage } from '../main/main';
import { HomePage } from '../home/home';





/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
emailPattern  = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
imageURI:any;
  picshow:any;
  transferURl:any;

  createSuccess = false;
  registerCredentials = { FirstName: '', MiddleName: '', LastName: '', UserName: '', password: '', confirmation_password: '', Mobile: '', Email: '' };

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
   private camera: Camera, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

 public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            // Take Image from photo Library
            const options: CameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.camera.getPicture(options).then((imageData) => {
 
        this.imageURI = 'data:image/jpeg;base64,' + imageData;
       

        }, (err) => {
        // Handle error
        });
            
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
             // Take Image from Camera
            const optionsCamera: CameraOptions = {
            quality: 100,
            targetWidth: 600,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

           this.camera.getPicture(optionsCamera).then((imageData) => {
           this.imageURI = 'data:image/jpeg;base64,' + imageData;
          
        }, (err) => {
        // Handle error
        });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        
      ]
    });
    actionSheet.present();

     
  }

  register()
  {
     // store Img in localstorage
    localStorage.setItem('ImgUrl', this.imageURI)
      //check password and conform password
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) 
    {
      this.showPopup("Error", 'The password confirmation does not match.');
    } 

    else
    {
        let alert = this.alertCtrl.create({
        title: "Success",
        subTitle: "Your account has been created successfully",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              
              localStorage.setItem('testObject', JSON.stringify(this.registerCredentials));
              this.navCtrl.push(MainPage)
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
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}