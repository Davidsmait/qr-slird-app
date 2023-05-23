import { Injectable } from '@angular/core';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserCardsService {

  private userCardsSubject = new Subject<any>()
  private userCards: any[] = []

  userCardsSubject$ = this.userCardsSubject.asObservable()


  constructor() { }

  addCard(data: any){
    this.userCards.unshift(data)
    this.userCardsSubject.next(this.userCards)
  }

  getCards(){
    return this.userCards.slice()
  }



}
