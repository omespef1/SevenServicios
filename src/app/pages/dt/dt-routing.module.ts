import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { DatePipe } from "@angular/common";


const routes: Routes = [
      {
        path: '',
        redirectTo: 'dtsmenu'
      },
      {
        path: 'dtsmenu',
        loadChildren: () => import('../dt/dtsmenu/dtsmenu.module').then(pl => pl.DtsmenuPageModule)
      },
      {
        path: 'dteendep',
        loadChildren: () => import('../dt/dteendep/dteendep.module').then(pl => pl.DteendepPageModule),
        canActivate: [AuthGuard]
      },
      { 
        path: 'dtasist', 
        loadChildren: () => import('../dt/dtasist/dtasist.module').then(pl => pl.DtasistPageModule),
        canActivate: [AuthGuard]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class DtRoutingModule { }