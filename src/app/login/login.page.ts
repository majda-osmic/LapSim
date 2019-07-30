import { Component, OnInit } from '@angular/core';
import { IUserOptions } from '../data-interfaces';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserData } from '../providers/user-data';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
   login: IUserOptions = { userName: '', password: '', isAdmin: false };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
       this.userData.login(this.login.userName);
    }
  }
}
