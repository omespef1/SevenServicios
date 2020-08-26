import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { DatePipe } from "@angular/common";


const routes: Routes = [
      {
        path: 'plcacul',
        loadChildren: () =>
          import('../pl/plcacul/plcacul.module').then(m => m.PlcaculPageModule),
      },
      {
        path:'plinfar',
        loadChildren:()=> import('../pl/plinfar/plinfar.module').then(c=>c.PlinfarPageModule)
      } ,
      {
        path: '',
        redirectTo: 'plsmenu'
      },
      {
        path: 'plsmenu',
        loadChildren: () => import('../pl/plsmenu/plsmenu.module').then(pl => pl.PlsmenuPageModule)
      },
      {
        path: 'plcasis',
        loadChildren: () => import('../pl/plcasis/plcasis.module').then(pl => pl.PlcasisPageModule)
      }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class PlRoutingModule { }
