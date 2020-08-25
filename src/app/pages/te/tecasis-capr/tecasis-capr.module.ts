import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TecasisCaprPage } from './tecasis-capr.page';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: TecasisCaprPage
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
  declarations: [TecasisCaprPage]
})
export class TecasisCaprPageModule {}
