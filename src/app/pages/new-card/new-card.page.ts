import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../services/photo.service";
import {ActionSheetService} from "../../services/action-sheet.service";
import {ActionSheetButton} from "@ionic/core/dist/types/components/action-sheet/action-sheet-interface";
import {SelectedAction} from "../../interfaces/selected-action";
import {GalleryPhotos} from "@capacitor/camera/dist/esm/definitions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {
  actionForm : FormGroup

  isOnLogoSelector = true
  isOnSelector = true

  selectedImage : string = ''
  id : number = 1

  selectedActions : Array<SelectedAction> = this.actionSheetService.selectedActions

  actionSheetButtons : Array<ActionSheetButton> = this.actionSheetService.actions

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private photoService: PhotoService,
    private actionSheetService: ActionSheetService,
    private fb: FormBuilder) {

    this.actionForm =this.fb.group({
      name: [''],
      number: [''],
      email: ['' , [Validators.email]],
      location: ['']
    })


  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!
    })



    this.actionSheetService.selectedAction.subscribe((action: SelectedAction) => {
      const actionFormName = action.data.formName
      this.actionForm.get(actionFormName)?.setValidators([Validators.required])
      this.cd.detectChanges()

    })
  }

  async activeActionSheet() {
    this.isOnSelector = !this.isOnSelector
    await this.actionSheetService.presentActionSheet()


  }

  onAddField(action : SelectedAction){
    this.actionSheetService.toggleActionState(action)
    console.log(this.actionForm)
  }

  onDeleteField(action : SelectedAction, index : number){
    this.actionSheetService.toggleActionState(action)
    this.actionSheetService.returnActionToSheet(action,index)

    this.actionForm.patchValue({
      [action.data.formName]: ''
    })
  }

  onChangeField(action : SelectedAction){
    this.actionSheetService.toggleActionState(action)

  }

  onAddIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector

    this.photoService.takeFromGallery().then(
      (data : GalleryPhotos)=>{
        this.selectedImage = data.photos[0].webPath
      }
    )
  }

  onChangeIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector
  }

//  FORM

  onSubmit(){

  }


}

