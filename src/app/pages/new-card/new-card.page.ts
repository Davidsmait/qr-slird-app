import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {
  isOnSelector = true
  id: number = 1

  itemsSelected: any = []

  actionSheetButtons = [
    {
      icon: "person-circle",
      text: 'name',
      data: {
        action: 'Name',
        icon: "person-circle",
        placeholder: 'Enter name'
      },
    },
    {
      icon: 'call',
      text: 'phone number',
      data: {
        action: 'Phone number',
        icon: 'call',
        placeholder: 'Enter number'
      },
    },
    {
      icon: 'mail',
      text: 'email',
      data: {
        action: 'Email',
        icon: 'mail',
        placeholder: 'Enter email'
      },
    },
    {
      icon: 'location',
      text: 'location',
      data: {
        action: 'Location',
        icon: 'location',
        placeholder: 'enter location'
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
    this.isOnSelector = !this.isOnSelector
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select one',
      buttons: this.actionSheetButtons,
    });

    actionSheet.onDidDismiss().then((data) => {
      const selectedAction = data.data.action
      if (data.data.action !== 'cancel'){
        this.itemsSelected.push(data.data)
      }

      this.deleteAction(selectedAction, 'Name')
      this.deleteAction(selectedAction, 'Phone number')
      this.deleteAction(selectedAction, 'Email')
      this.deleteAction(selectedAction, 'Location')

    })

    console.log(this.actionSheetButtons)
    await actionSheet.present();
  }

  deleteAction(selectedAction: any, action: any){
    if (selectedAction === action){
      const deleteButtonIndex = this.actionSheetButtons.findIndex(
        (button) =>{
          return button.data.action === action
        }
      )
      console.log('deleteButtonIndex: ',deleteButtonIndex)
      this.actionSheetButtons.splice(deleteButtonIndex, 1)
    }
  }

  onAddField(){
    this.isOnSelector = !this.isOnSelector
  }
}
