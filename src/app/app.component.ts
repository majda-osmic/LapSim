import { Component, OnInit } from '@angular/core';

import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserData } from './providers/user-data';
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
    private userData: UserData
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

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
      if (!this.loggedIn) {
        return this.router.navigateByUrl('/login');
      } else {
        this.userData.isLoggedInAsAdmin().then(value => this.isAdmin = value);
      }
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/home');
    });
  }

}
