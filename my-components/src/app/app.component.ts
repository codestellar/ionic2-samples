import { Component, ViewChild  } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { ColorPicker } from '../pages/color-picker/color-picker';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage: any;  
   @ViewChild(Nav) nav: Nav;

  private menu: MenuController;
  private platform: Platform;
  private pages: Array<{ title: string, component: any, icon: string }>;

  constructor(platform: Platform, menu: MenuController) {
    this.platform = platform;
    this.rootPage = ColorPicker;
    this.menu = menu;

    this.pages = [    
    // { title: 'Users', component: UsersPage, icon: 'speedometer',childPages:[] }
      { title: 'Colors', component: ColorPicker, icon: 'speedometer' }
    ];

    this.initializeApp();
  }

    private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // console.log('api URL ' + Config.apiURL);
      // console.log('api key ' + Config.apiKey);
    });
    }

    openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
