import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { gminfar } from '../../models/gm/gminfar';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
  {
    path:'etinfar',
    loadChildren:()=> import('../et/etinfar/etinfar.module').then(gm=>gm.EtinfarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path:'etcurso',
    loadChildren:()=> import('../et/etcurso/etcurso.module').then(gm=>gm.EtcursoPageModule),
   
  },
 {
   path:'',
   redirectTo:'etcurso'
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtRoutingModule { }
