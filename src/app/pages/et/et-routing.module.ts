import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; 1
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: "etinfar",
    loadChildren: () =>
      import("../et/etinfar/etinfar.module").then((gm) => gm.EtinfarPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "etcurso",
    loadChildren: () =>
      import("../et/etcurso/etcurso.module").then((gm) => gm.EtcursoPageModule),
  },
  {
    path: "",
    redirectTo: "etsmenu",
  },
  {
    path: "etsmenu",
    loadChildren: () =>
      import("../et/etsmenu/etsmenu.module").then((et) => et.EtsmenuPageModule),
  },
  {
    path: "etasist",
    loadChildren: () =>
      import("../et/etasist/etasist.module").then((et) => et.EtasistPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'etcotiz',
    loadChildren: () =>
      import("../et/etcotiz/etcotiz.module").then((et) => et.EtcotizPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtRoutingModule { }
