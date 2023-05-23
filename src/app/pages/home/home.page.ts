import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserCardsService} from "../../services/user-cards.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasCardOwned = false
  ownedCards: any

  // cardSubscription: Subscription

  cardSource = ["../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png"]
  constructor(
    private userCards: UserCardsService,
    private route: ActivatedRoute, private router: Router) {

  }

  ownCardStateChange(){
    console.log(this.ownedCards)
    this.hasCardOwned = !this.hasCardOwned
  }

  onClickNew(){
    this.router.navigate(['/tabs/home/new-card/'])
  }
}
