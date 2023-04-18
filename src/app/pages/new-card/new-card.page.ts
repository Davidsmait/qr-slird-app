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

  selectedItems: any = []

  actionSheetButtons = [
    {
      icon: "person-circle",
      text: 'name',
      data: {
        action: 'Name',
        icon: "person-circle",
        placeholder: 'Enter name',
        value: '',
        active: true
      },
    },
    {
      icon: 'call',
      text: 'phone number',
      data: {
        action: 'Phone number',
        icon: 'call',
        placeholder: 'Enter number',
        value: null,
        active: true
      },
    },
    {
      icon: 'mail',
      text: 'email',
      data: {
        action: 'Email',
        icon: 'mail',
        placeholder: 'Enter email',
        value: '',
        active: true
      },
    },
    {
      icon: 'location',
      text: 'location',
      data: {
        action: 'Location',
        icon: 'location',
        placeholder: 'Enter location',
        value: '',
        active: true
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
        this.selectedItems.unshift(data)
      }

      this.deleteAction(selectedAction, 'Name')
      this.deleteAction(selectedAction, 'Phone number')
      this.deleteAction(selectedAction, 'Email')
      this.deleteAction(selectedAction, 'Location')

    })

    await actionSheet.present();
  }

  deleteAction(selectedAction: any, action: any){
    if (selectedAction === action){
      const deleteButtonIndex = this.actionSheetButtons.findIndex(
        (button) =>{
          return button.data.action === action
        }
      )
      this.actionSheetButtons.splice(deleteButtonIndex, 1)
    }
  }

  onAddField(item:any){
    item.data.active = !item.data.active
  }

  onDeleteField(item:any, i: number){
    item.data.active = !item.data.active

    this.selectedItems.splice(i,1)

    this.actionSheetButtons.push(
      {
        icon: item.data.icon,
        text: item.data.action,
        data: item.data,
      },
    )
    item.data.value = undefined
  }

  onChangeField(item: any){
    item.data.active = !item.data.active

  }
}
