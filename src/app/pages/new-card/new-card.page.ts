import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../services/photo.service";
import {ActionSheetService} from "../../services/action-sheet.service";
import {ActionSheetButton} from "@ionic/core/dist/types/components/action-sheet/action-sheet-interface";
import {SelectedAction} from "../../interfaces/selected-action";
import {GalleryPhotos} from "@capacitor/camera/dist/esm/definitions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {of} from "rxjs";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {
  actionForm : FormGroup

  isOnLogoSelector = true
  isOnSelector = true
  isUpdateBtnDisabled = true
  selectedImage : string = ''

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
      name: ['', [Validators.pattern('^[a-zA-ZáéíóúñÁÉÍÓÚÑ\\s]+$')]],
      number: ['', [Validators.pattern('^[0-9]*$')]],
      email: ['' , [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      location: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      image: [''],
      templateId: []
    })


  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.id = +params.get('id')!
    //   // console.log("id: ",this.id)
    //   this.actionForm.get('templateId')?.setValue(+params.get('id')!)
    // })

    this.route.queryParamMap.subscribe((param) => {
      this.actionForm.get('templateId')?.setValue(param.get('id'))
      console.log(param.get('id'))
    })

    this.actionSheetService.selectedAction.subscribe((action: SelectedAction) => {
      const actionFormName = action.data.formName
      this.actionForm.get(actionFormName)?.addValidators([Validators.required])
    })

    // Change Detection
    this.actionForm.statusChanges.subscribe((status)=> {
      console.log('status: ', status)
      this.isUpdateBtnDisabled = status === 'INVALID';
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

    this.actionForm.patchValue({
      [action.data.formName]: ``
    }, { emitEvent: false, onlySelf: true })
  }

  onChangeField(action : SelectedAction){
    this.actionSheetService.toggleActionState(action)

  }

  onAddIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector

    this.photoService.takeFromGallery().then(
      (data : GalleryPhotos)=>{
        this.selectedImage = data.photos[0].webPath
        this.actionForm.get('image')?.setValue(this.selectedImage)
      }
    )
  }

  onChangeIcon(){
    this.isOnLogoSelector = !this.isOnLogoSelector
  }

//  FORM

  onSubmit(){
    console.log(this.actionForm.value)
  }



}

