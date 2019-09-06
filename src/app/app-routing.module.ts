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
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
