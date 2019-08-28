import { Component, OnInit } from '@angular/core';

import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar,
    private events: Events,
    private userData: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
  ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  async checkLoginStatus() {
    const loggedIn = await this.userData.isLoggedIn();
    await this.updateLoggedInStatus(loggedIn);
  }

  async updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(async () => {
      this.loggedIn = loggedIn;
      if (!this.loggedIn) {
        return this.router.navigateByUrl('/login');
      } else {
        this.isAdmin = await this.userData.isLoggedInAsAdmin();
      }
    }, 300);
  }

  async listenForLoginEvents() {
    this.events.subscribe('user:login', async () => {
      await this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', async () => {
     await this.updateLoggedInStatus(false);
    });
  }

  async logout() {
    await this.userData.logout();
    this.router.navigateByUrl('/login');
  }

}
