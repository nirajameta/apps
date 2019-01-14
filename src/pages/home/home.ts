import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../login/login';


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public app: App, public alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    //Check present location from Geolocation
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();

    }, (err) => {
       

      console.log(err);
       {
      const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['OK']
    });
    alert.present();
        
       }
     

    });

  }
  // point to present location
  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";          

    this.addInfoWindow(marker, content);

  }

addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  logout(){
    var nav = this.app.getRootNav()
        nav.setRoot(LoginPage);
  }
}