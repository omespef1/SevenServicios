import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { gminfar } from '../../models/gm/gminfar';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path: 'gmplane',
    loadChildren: () => import('../gm/gmplane/gmplane.module').then(gm => gm.GmplanePageModule)
  },
  {
    path: 'gminfar',
    loadChildren: () => import('../gm/gminfar/gminfar.module').then(gm => gm.GminfarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'gmsmenu'
  },
  { 
    path: 'gmsmenu', 
    loadChildren: () => import('../gm/gmsmenu/gmsmenu.module').then(gm => gm.GmsmenuPageModule)
  },
  { 
    path: 'gmcotiz', 
    loadChildren: () => import('../gm/gmcotiz/gmcotiz.module').then(gm => gm.GmcotizPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmRoutingModule { }
