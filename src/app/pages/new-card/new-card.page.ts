import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../services/photo.service";
import {ActionSheetService} from "../../services/action-sheet.service";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {
  isOnLogoSelector = true
  isOnSelector = true

  selectedImage : string = ''
  id: number = 1

  selectedActions = this.actionSheetService.selectedActions

  actionSheetButtons: Array<object> = this.actionSheetService.actions

  constructor(
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private photoService: PhotoService,
    private actionSheetService: ActionSheetService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!
    })
  }

  async activeActionSheet() {
    this.isOnSelector = !this.isOnSelector
    await this.actionSheetService.presentActionSheet()
  }


  onAddField(action:any){
    this.actionSheetService.toggleActionState(action)
  }

  onDeleteField(action:any, i: number){
    this.actionSheetService.toggleActionState(action)
    this.actionSheetService.returnActionToSheet(action,i)
    action.data.value = undefined
  }

  onChangeField(action: any){
    this.actionSheetService.toggleActionState(action)

  }

  onAddIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector

    this.photoService.takeFromGallery().then(
      (data)=>{
        this.selectedImage = data.photos[0].webPath
        console.log(data.photos)
      }
    )
  }

  onChangeIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector
  }


}

