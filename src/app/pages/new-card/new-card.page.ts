import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../services/photo.service";
import {ActionSheetService} from "../../services/action-sheet.service";
import {ActionSheetButton} from "@ionic/core/dist/types/components/action-sheet/action-sheet-interface";
import {SelectedAction} from "../../interfaces/selected-action";
import {GalleryPhotos} from "@capacitor/camera/dist/esm/definitions";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {
  isOnLogoSelector = true
  isOnSelector = true

  selectedImage : string = ''
  id : number = 1

  selectedActions : Array<SelectedAction> = this.actionSheetService.selectedActions

  actionSheetButtons : Array<ActionSheetButton> = this.actionSheetService.actions

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

  onAddField(action : SelectedAction){
    this.actionSheetService.toggleActionState(action)

  }

  onDeleteField(action : SelectedAction, index : number){
    this.actionSheetService.toggleActionState(action)
    this.actionSheetService.returnActionToSheet(action,index)
    action.data.value = undefined
    console.log(action)
  }

  onChangeField(action : SelectedAction){
    this.actionSheetService.toggleActionState(action)

  }

  onAddIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector

    this.photoService.takeFromGallery().then(
      (data : GalleryPhotos)=>{
        this.selectedImage = data.photos[0].webPath
        console.log(data.photos)
      }
    )
  }

  onChangeIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector
  }
}

