import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }


  whatsappShare(){
    SocialSharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "http://github.com/codestellar" /* url */)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  twitterShare(){
    SocialSharing.shareViaTwitter("Message via Twitter",null /*Image*/,"http://github.com/codestellar")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  facebookShare(){
    SocialSharing.shareViaFacebook("Message via Twitter",null /*Image*/,"http://github.com/codestellar")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  otherShare(){
    SocialSharing.share("Genral Share Sheet",null/*Subject*/,null/*File*/,"http://github.com/codestellar")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })

  }
}