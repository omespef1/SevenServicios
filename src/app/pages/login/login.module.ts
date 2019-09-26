import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { LoginPage } from "./login.page";
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  },
  {
    path: "gnempre",
    loadChildren: () =>
      import("../gn/gnempre/gnempre.module").then(g => g.GnemprePageModule)
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
  entryComponents: [],
  declarations: [LoginPage]
})
export class LoginPageModule {}
