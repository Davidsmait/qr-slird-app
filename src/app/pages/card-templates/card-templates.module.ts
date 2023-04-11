import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardTemplatesPageRoutingModule } from './card-templates-routing.module';

import { CardTemplatesPage } from './card-templates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardTemplatesPageRoutingModule
  ],
  declarations: [CardTemplatesPage]
})
export class CardTemplatesPageModule {}
