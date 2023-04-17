import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {
  selectedIcon = ""
  isOnSelector = true
  id: number = 1

  actionSheetButtons = [
    {
      icon: "person-circle",
      text: 'name',
      data: {
        action: 'Name',
        icon: "person-circle"
      },
    },
    {
      icon: 'call',
      text: 'phone number',
      data: {
        action: 'Phone number',
        icon: 'call',
      },
    },
    {
      icon: 'mail',
      text: 'email',
      data: {
        action: 'Email',
        icon: 'mail',
      },
    },
    {
      icon: 'location',
      text: 'location',
      data: {
        action: 'Location',
        icon: 'location',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]
  constructor(private route: ActivatedRoute, private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!
    })
  }

  async presentActionSheet() {
    this.selectedIcon = ''
    this.isOnSelector = !this.isOnSelector
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: this.actionSheetButtons,
    });

    await actionSheet.present();
    await actionSheet.onDidDismiss().then((data) => {
      this.selectedIcon = data.data.icon
      console.log(data)
    })
  }

  onAddField(){
    this.isOnSelector = !this.isOnSelector
  }
}
