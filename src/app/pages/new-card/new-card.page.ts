import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../services/photo.service";
import {ActionSheetService} from "../../services/action-sheet.service";
import {ActionSheetButton} from "@ionic/core/dist/types/components/action-sheet/action-sheet-interface";
import {SelectedAction} from "../../interfaces/selected-action";
import {GalleryPhotos} from "@capacitor/camera/dist/esm/definitions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserCardsService} from "../../services/user-cards.service";
import { KeyValuePipe} from "@angular/common";
import {CardTemplatesService} from "../../services/card-templates.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
  providers: [KeyValuePipe]
})
export class NewCardPage implements OnInit , OnDestroy {
  private subscriptions : Subscription = new Subscription()

  actionForm : FormGroup = new FormGroup({})

  isOnLogoSelector = true
  isOnSelector = true
  isUpdateBtnDisabled = true
  selectedImage : string = ''

  selectedActions : Array<SelectedAction> = []

  actionSheetButtons : Array<ActionSheetButton> = []


  templateSelected: string = ''

  constructor(
    private cardTemplates: CardTemplatesService,
    private userCards: UserCardsService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private photoService: PhotoService,
    private actionSheetService: ActionSheetService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.selectedActions = this.actionSheetService.selectedActions
    this.actionSheetButtons = this.actionSheetService.actions

    this.actionForm = this.fb.group({
      image: [''],
      templateId: []
    })

    this.actionSheetButtons.forEach((action, index) => {
      if (!action.role){
        this.actionForm.addControl(
          action.data.formName,
          this.fb.control(action.data.value, action.data.validators))
      }
    })

    this.subscriptions.add(
      this.route.queryParamMap.subscribe((param) => {
        this.actionForm.get('templateId')?.setValue(param.get('id'))
      })
    )

    this.subscriptions.add(
      this.actionSheetService.selectedAction.subscribe((action: SelectedAction) => {
        const actionFormName = action.data.formName
        this.actionForm.get(actionFormName)?.addValidators([Validators.required])
      })
    )


    this.subscriptions.add(
      // Change Detection
      this.actionForm.statusChanges.subscribe((status)=> {
        this.isUpdateBtnDisabled = status === 'INVALID';
      })
    )

    this.subscriptions.add(
      this.cardTemplates.selectedCardSrc$.subscribe(src => {
        this.templateSelected = src
      })
    )


  }
  ngOnDestroy() {
    this.actionSheetService.toggleActionsStateToTrue()
    this.actionSheetService.returnActionsToSheet()

    this.subscriptions.unsubscribe()
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

  shouldShowItem(value: any){
    return !(value.key === "image" || value.key === "templateId");

  }

//  FORM

  onSubmit(){
    // console.log(this.selectedActions)
    // console.log(this.actionForm.value)

    this.userCards.addCard(this.actionForm.value)

    this.router.navigate(['/tabs/home'])
  }



}

