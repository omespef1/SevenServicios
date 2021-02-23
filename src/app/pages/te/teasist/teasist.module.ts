import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeasistPage } from './teasist.page';
import { ComponentsModule } from '../../../components/components.module';
import { ModalComponent } from '../../../components/modal/modal/modal.component';

const routes: Routes = [
  {
    path: "",
    component: TeasistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [TeasistPage],
  entryComponents: [ModalComponent]
})
export class TeasistPageModule {}
