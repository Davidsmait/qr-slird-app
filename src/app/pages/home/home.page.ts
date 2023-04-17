import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasCardOwned = false

  cardSource = ["../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png"]
  constructor() {}

  ownCardStateChange(){
    this.hasCardOwned = !this.hasCardOwned;
  }
}
