import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';
import { PlcaculPageModule } from '../pages/pl/plcacul/plcacul.module';
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
            loadChildren: ()=> import('../pages/gm/gmplane/gmplane.module').then(m=>m.GmplanePageModule),
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
      {
        path: 'caregob',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/cf/cfregob/cfregob.module').then(m => m.CfregobPageModule),
              canActivate:[AuthGuard]
          }
        ]
      },  
      {
        path: 'plcacul',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/pl/plcacul/plcacul.module').then(m => m.PlcaculPageModule),
              canActivate:[AuthGuard]
          }
        ]
      }, 
      {
        path: 'cascrev',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/cf/cascrev/cascrev.module').then(m => m.CascrevPageModule),
              canActivate:[AuthGuard]
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
