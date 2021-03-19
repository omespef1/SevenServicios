import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [  
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "tabs",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "",
    redirectTo: "tabs/menu",
    pathMatch: "full"
  },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'suafili', loadChildren: './pages/su/suafili/suafili.module#SuafiliPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  // { path: 'plinfar', loadChildren: './pages/pl/plinfar/plinfar.module#PlinfarPageModule' },
  // { path: 'teinfar', loadChildren: './pages/te/teinfar/teinfar.module#TeinfarPageModule' },
  // { path: 'dtinfar', loadChildren: './pages/dt/dtinfar/dtinfar.module#DtinfarPageModule' },
  // { path: 'dtsmenu', loadChildren: './pages/dt/dtsmenu/dtsmenu.module#DtsmenuPageModule' },
  // { path: 'dtasist', loadChildren: './pages/dt/dtasist/dtasist.module#DtasistPageModule' },
  // { path: 'tusmenu', loadChildren: './pages/tu/tusmenu/tusmenu.module#TusmenuPageModule' },

  // { path: 'modal', loadChildren: './pages/modal/modal/modal.module#ModalPageModule' },



 
  
    
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
