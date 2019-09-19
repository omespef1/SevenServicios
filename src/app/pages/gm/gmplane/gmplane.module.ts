import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GmplanePage } from './gmplane.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { GntoperPage } from '../../gn/gntoper/gntoper.page';

const routes: Routes = [
  {
    path: '',
    component: GmplanePage
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
  declarations: [GmplanePage,GntoperPage],
  entryComponents:[GntoperPage]
})
export class GmplanePageModule {}
