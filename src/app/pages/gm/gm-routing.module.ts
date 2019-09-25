import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { gminfar } from '../../models/gm/gminfar';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path:'gmplane',
    loadChildren:()=> import('../gm/gmplane/gmplane.module').then(gm=>gm.GmplanePageModule)
  },
  {
    path:'gminfar',
    loadChildren:()=> import('../gm/gminfar/gminfar.module').then(gm=>gm.GminfarPageModule),
    canActivate: [AuthGuard]
  },
 {
   path:'',
   redirectTo:'gmplane'
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmRoutingModule { }
