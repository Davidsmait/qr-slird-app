import { Injectable } from '@angular/core';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserCardsService {

  private userCard = new Subject<any>()
  private userCards: any[] = []

  constructor() { }

  addCard(data: any){
    this.userCards.push(data)
    this.userCard.next(data)
  }

  getCards(){
    return [...this.userCards]
  }



}
