import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CfregobPage } from './cfregob.page';
import { ComponentsModule } from '../../../components/components.module';
import { CadrecoPage } from '../cadreco/cadreco.page';

const routes: Routes = [
  {
    path: '',
    component: CfregobPage
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
  declarations: [CfregobPage,CadrecoPage],
  entryComponents:[
    CadrecoPage
  ]
})
export class CfregobPageModule {}
