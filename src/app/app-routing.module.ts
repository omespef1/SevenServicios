import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule)
  },
  { path: 'dteendep', loadChildren: './pages/dt/dteendep/dteendep.module#DteendepPageModule' },
  { path: 'etcurso', loadChildren: './pages/et/etcurso/etcurso.module#EtcursoPageModule' },
  { path: 'plcacul', loadChildren: './pages/pl/plcacul/plcacul.module#PlcaculPageModule' },
  { path: 'tecuter', loadChildren: './pages/te/tecuter/tecuter.module#TecuterPageModule' },
  { path: 'tuplatu', loadChildren: './pages/tu/tuplatu/tuplatu.module#TuplatuPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {path:'tabs',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },


 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
