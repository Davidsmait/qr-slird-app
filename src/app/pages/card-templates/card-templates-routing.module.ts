import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardTemplatesPage } from './card-templates.page';

const routes: Routes = [
  {
    path: '',
    component: CardTemplatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardTemplatesPageRoutingModule {}
