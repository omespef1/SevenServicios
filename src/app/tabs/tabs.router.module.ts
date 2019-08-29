import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'gmplane',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/gm/gmplane/gmplane.module').then(m => m.GmplanePageModule),
             canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: 'dtendep',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/dt/dteendep/dteendep.module').then(m => m.DteendepPageModule)
          }
        ]
      },
      {
        path: 'etcurso',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/pl/plcacul/plcacul.module').then(m => m.PlcaculPageModule)
          }
        ]
      },
      {
        path: 'tecuter',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/te/tecuter/tecuter.module').then(m => m.TecuterPageModule)
          }
        ]
      },
      {
        path: 'tuplatu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/tu/tuplatu/tuplatu.module').then(m => m.TuplatuPageModule)
          }
        ]
      },     
    ]
  },
  {
    path: '',
    redirectTo: 'gmplane',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
