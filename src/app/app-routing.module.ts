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
  { path: 'gntoper', loadChildren: './pages/gn/gntoper/gntoper.module#GntoperPageModule' },
  // { path: 'cfregob', loadChildren: './pages/cf/cfregob/cfregob.module#CfregobPageModule' }, 
    // { path: 'cascrev', loadChildren: './pages/cf/cascrev/cascrev.module#CascrevPageModule' }, 
      // { path: 'gminfar', loadChildren: './pages/gm/gminfar/gminfar.module#GminfarPageModule' },
 
  
    
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
