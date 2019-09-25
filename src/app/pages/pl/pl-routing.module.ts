import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


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
        path:'',
        redirectTo:'plcacul'
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlRoutingModule { }
