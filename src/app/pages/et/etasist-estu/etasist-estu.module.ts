import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EtasistEstuPage } from './etasist-estu.page';

const routes: Routes = [
  {
    path: '',
    component: EtasistEstuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EtasistEstuPage]
})
export class EtasistEstuPageModule {}
