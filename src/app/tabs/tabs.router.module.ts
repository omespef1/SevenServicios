import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
            loadChildren: () => import('../pages/gm/gm-routing.module').then(m => m.GmRoutingModule),
          }
        ]
      },
      {
        path: 'et',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/et/et-routing.module').then(m => m.EtRoutingModule),
          }
        ]
      },
      {
        path: 'pl',
        loadChildren: () => import('../pages/pl/pl-routing.module').then(pl => pl.PlRoutingModule)
      },
      {
        path: 'dt',
        loadChildren: () => import('../pages/dt/dt-routing.module').then(dt => dt.DtRoutingModule)
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
        path: 'tu',
        loadChildren: () => import('../pages/tu/tu-routing.module').then(tu => tu.TuRoutingModule)
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
        path: 'menu',
        loadChildren: () => import('../pages/menu/menu.module').then(m => m.MenuPageModule)
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
export class TabsPageRoutingModule { }
