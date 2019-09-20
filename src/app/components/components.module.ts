import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    CommonModule   ,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
