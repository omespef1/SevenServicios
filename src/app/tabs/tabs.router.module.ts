import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';
import { DtinfarPageModule } from '../pages/dt/dtinfar/dtinfar.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'gm',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/gm/gm-routing.module').then(m=>m.GmRoutingModule),
          }
        ]
      },
      {
        path: 'pl',
        loadChildren: () => import('../pages/pl/pl-routing.module').then(pl => pl.PlRoutingModule)
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
        path: 'dtinfar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/dt/dtinfar/dtinfar.module').then(m => m.DtinfarPageModule)
          }
        ]
      },
      {
        path: 'etinfar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/et/etinfar/etinfar.module').then(m => m.EtinfarPageModule)
          }
        ]
      },
      {
        path: 'suafili',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/su/suafili/suafili.module').then(m => m.SuafiliPageModule)
          }
        ]
      },
      {
        path: 'etcurso',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/et/etcurso/etcurso.module').then(m => m.EtcursoPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'te',
        loadChildren: () => import('../pages/te/te-routing.module').then(te => te.TeRoutingModule)
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
      {
        path: 'cf',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/cf/cf-routing.module').then(cf => cf.CfRoutingModule)
          }
        ]
      },
      {
        path:'menu',
        loadChildren: ()=>import('../pages/menu/menu.module').then(m=>m.MenuPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
