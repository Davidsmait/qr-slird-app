import { Injectable } from '@angular/core';
import {ActionSheetController} from "@ionic/angular";
import {ActionSheetButton} from "@ionic/core/dist/types/components/action-sheet/action-sheet-interface";
import {SelectedAction} from "../interfaces/selected-action";
import { Subject} from "rxjs";
import {Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {
  selectedAction : Subject<any> = new Subject<any>()

  selectedActions: Array<SelectedAction> = []

  actions : Array<ActionSheetButton> = [
    {
      icon: "logo-whatsapp",
      text: 'whatsapp',
      data: {
        action: 'Whatsapp',
        icon: "logo-whatsapp",
        placeholder: 'Enter whatsapp',
        value: '',
        active: true,
        formName: 'whatsapp',
        validators: [
          Validators.pattern('^\\d{10,}$')
        ]
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
        active: true,
        formName: 'number',
        validators: [ Validators.pattern('^[0-9]*$')]
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
        active: true,
        formName: 'email',
        validators: [
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
        ]
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
        active: true,
        formName: 'location',
        validators: [Validators.pattern('^[a-zA-Z ]*$')]
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
      }})


    await actionSheet.present();

    actionSheet.onWillDismiss().then((data) => {
      this.updateSelectedAction(data)
    })
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

  toggleActionsStateToTrue(){
    for (let i = 0; i < this.selectedActions.length; i++) {
      this.selectedActions[i].data.active = true;
    }
  }

  returnActionToSheet(action:SelectedAction, index: number){
    this.selectedActions.splice(index,1)

    this.pushToSheet(action)
  }

  returnActionsToSheet(){

    for (const action of this.selectedActions) {
      this.pushToSheet(action)
    }
    this.selectedActions.splice(0, this.selectedActions.length)
  }

  private updateSelectedAction(action: any): void{
    this.selectedAction.next(action)
  }

  private pushToSheet(action: SelectedAction) {
    this.actions.push(
      {
        icon: action.data.icon,
        text: action.data.action,
        data: action.data,
      })
  }

  getActionSheetButton() {
    return [...this.actions]
  }

}

