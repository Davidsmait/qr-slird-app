import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardTemplatesService {

  private selectedCardSrc = new Subject<string>()

  selectedCardSrc$ = this.selectedCardSrc.asObservable()

  cards = [
    {
      id: 1,
      src: "../../assets/images/card-demo@3x.png"
    },
    {
      id: 2,
      src: "../../assets/images/card-template-blue.png"

    },
    {
      id: 3,
      src: "../../assets/images/card-template-black.png"
    },
    {
      id: 4,
      src: "../../assets/images/card-template-artico.png"
    },
  ]

  changeSelectedCard(id: number){
    const currentSrc = this.findSrcViaId(id)
    this.selectedCardSrc.next(currentSrc)
  }

  findSrcViaId(id: number){
    return this.cards.find((card) => {
      return card.id === id
    })!.src
  }

  constructor() { }
}
