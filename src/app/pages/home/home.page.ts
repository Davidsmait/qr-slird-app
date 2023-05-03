import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasCardOwned = false

  cardSource = ["../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png"]
  constructor(private route: ActivatedRoute, private router: Router) {}

  ownCardStateChange(){
    this.hasCardOwned = !this.hasCardOwned;
  }

  onClickNew(){
    this.router.navigate(['/tabs/home/new-card/'])
  }
}
