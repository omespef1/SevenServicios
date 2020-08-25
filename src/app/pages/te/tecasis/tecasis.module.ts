import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TecasisPage } from './tecasis.page';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: TecasisPage
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
  declarations: [TecasisPage]
})
export class TecasisPageModule {}
