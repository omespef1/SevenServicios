import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PlasistPage } from "./plasist.page";
import { ComponentsModule } from "../../../components/components.module";
import { ModalComponent } from '../../../components/modal/modal/modal.component';

const routes: Routes = [
  {
    path: "",
    component: PlasistPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [PlasistPage],
  entryComponents: [ModalComponent]
})
export class PlasistPageModule {}
