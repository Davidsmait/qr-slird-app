import { Component, OnInit } from '@angular/core';
import {CardTemplatesService} from "../../services/card-templates.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-templates',
  templateUrl: './card-templates.page.html',
  styleUrls: ['./card-templates.page.scss'],
})
export class CardTemplatesPage implements OnInit {
  cards : {id:number, src:string}[] = []

  constructor(
    private cardTemplates: CardTemplatesService,
    private router: Router) { }

  ngOnInit() {
    this.cards = this.cardTemplates.cards
  }

  onChooseTemplate(id:number){
    console.log('id from template component: ',id)
    this.router.navigate(
      ['/tabs/home/new-card'],
      {queryParams: {id}, queryParamsHandling: 'merge'})
  }

}
