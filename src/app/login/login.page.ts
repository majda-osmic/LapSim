import { Component } from '@angular/core';
import { IUserOptions } from '../data-interfaces';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  login: IUserOptions = { userName: '', password: ''};
  submitted = false;
  loggedIn = false;

  constructor(
    public userData: AuthService,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.userName, this.login.password).subscribe(result => {
        this.loggedIn = result !== false;
        if (!this.loggedIn) {
          form.reset(); // TODO: set message
        }
      });

    }
  }
}
