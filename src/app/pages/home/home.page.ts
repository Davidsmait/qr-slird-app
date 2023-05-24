import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserCardsService} from "../../services/user-cards.service";
import {CardTemplatesService} from "../../services/card-templates.service";
import {NewCardForm} from "../../interfaces/new-card-form";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit{
  ownedCards: NewCardForm[] = []

  selectedCardSrc = ''


  cardSource = ["../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png","../../assets/images/card-demo@3x.png"]
  constructor(
    private cardTemplates: CardTemplatesService,
    private userCards: UserCardsService,
    private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.userCards.userCardsSubject$.subscribe(cardsData => {
      console.log('userCardsSubject$: ',cardsData)
      this.ownedCards = cardsData
    })
  }


  onClickNew(){
    this.router.navigate(['/tabs/home/new-card/'])
  }

  findImageSrc(card: NewCardForm){
    return this.cardTemplates.findSrcViaId(Number(card.templateId))
  }

  onClickCard(card: NewCardForm){
    // console.log(card)
  }
}
