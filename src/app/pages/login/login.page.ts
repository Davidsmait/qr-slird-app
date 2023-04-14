import { Component, OnInit } from '@angular/core';
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isIos;
  constructor(public platform: Platform, private router: Router) {
    this.isIos = this.platform.is('ios');
  }

  ngOnInit() {
  }

  onSignUp(){
    console.log('sign')
    this.router.navigate(['tabs'])
  }

}
