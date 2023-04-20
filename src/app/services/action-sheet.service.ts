import { Injectable } from '@angular/core';
import {ActionSheetController} from "@ionic/angular";
import {ActionSheetButton} from "@ionic/core/dist/types/components/action-sheet/action-sheet-interface";
import {SelectedAction} from "../interfaces/selected-action";

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {
  selectedActions: Array<SelectedAction> = []

  actions : Array<ActionSheetButton> = [
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

  constructor(private actionSheetController: ActionSheetController) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select one',
      buttons: this.actions,
    });

    actionSheet.onDidDismiss().then((data) => {
      const selectedAction = data.data.action

      if (data.data.action !== 'cancel'){
        this.selectedActions.unshift(<SelectedAction>data)

        for (let action of this.actions) {
          this.removeActionFromSheet(selectedAction, action.data.action)
        }
      }
      // console.log(this.selectedActions)
    })

    await actionSheet.present();
  }

  private removeActionFromSheet(selectedAction: string, action: string){
    if (selectedAction === action){
      const deleteButtonIndex = this.actions.findIndex(
        (button : ActionSheetButton) =>{
          return button.data.action === action
        }
      )
      this.actions.splice(deleteButtonIndex, 1)
    }
  }

  toggleActionState(action:SelectedAction){
    action.data.active = !action.data.active
  }

  returnActionToSheet(action:SelectedAction, index: number){
    this.selectedActions.splice(index,1)

    this.actions.push(
      {
        icon: action.data.icon,
        text: action.data.action,
        data: action.data,
      },
    )

  }
}

