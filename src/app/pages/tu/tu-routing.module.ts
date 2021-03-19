import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";

const routes: Routes = [
  {
    path: "tuplatu",
    loadChildren: () => import("../tu/tuplatu/tuplatu.module").then((tu) => tu.TuplatuPageModule),
  },
  {
    path: "",
    redirectTo: "tusmenu",
  },
  {
    path: "tusmenu",
    loadChildren: () => import("../tu/tusmenu/tusmenu.module").then(tu => tu.TusmenuPageModule)
  }
  // {
  //   path: "tucotiz",
  //   loadChildren: () =>
  //     import("../tu/tucotiz/tucotiz.module").then((tu) => tu.TucotizPageModule),
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class TuRoutingModule { }
