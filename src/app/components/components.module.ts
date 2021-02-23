import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { ToggableCardComponent } from './cards/toggable-card/toggable-card.component';
import { ModalComponent } from './modal/modal/modal.component';




@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent,
    ToggableCardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule   ,
    IonicModule,
  ],
  entryComponents:[
    ModalComponent
  ],
  exports: [
    HeaderComponent,
    AlertComponent,
    ToggableCardComponent,
    
  ]
})
export class ComponentsModule { }
