import { Component, OnInit } from '@angular/core';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isIos;
  constructor(public platform: Platform) {
    this.isIos = this.platform.is('ios');
  }

  ngOnInit() {
  }

}
