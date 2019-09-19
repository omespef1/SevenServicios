import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GminfarPage } from './gminfar.page';
import { ComponentsModule } from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: GminfarPage
  }
];

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GminfarPage],
  entryComponents:[]
})
export class GminfarPageModule {}
