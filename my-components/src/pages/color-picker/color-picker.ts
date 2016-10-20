import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ColorPicker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-color-picker',
  templateUrl: 'color-picker.html'
})
export class ColorPicker {
  private color: string;
  constructor(public navCtrl: NavController) {
    this.color = 'primary';
  }
  
  ionViewDidLoad() {
    console.log('Hello ColorPicker Page');
  }

  changeColor(color:string) {
    this.color = color;
  }

}
