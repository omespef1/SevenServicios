import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { ToggableCardComponent } from './cards/toggable-card/toggable-card.component';




@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent,
    ToggableCardComponent
  ],
  imports: [
    CommonModule   ,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    AlertComponent,
    ToggableCardComponent
  ]
})
export class ComponentsModule { }
